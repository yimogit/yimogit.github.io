---
title: Docker Compose V2 安装 ClickHouse v20.6.8.5 经验分享
date: 2023-10-06 12:36:00
category:
  - DevOps
tag:
  - devops
  - docker
  - docker-compose
  - clickhouse
---

## 前言
> ClickHouse 是一款开源的分布式列式数据库管理系统，专门设计用于高性能的大数据分析和查询。    
> 目前项目中用到的一个场景是将mongo的数据同步到clickhouse，使用clickhouse做报表，后续也将分享同步和使用方案
- 使用 Docker Compose 部署单机版，小项目和自己测试够用了，生产使用集群，基于此方案后续有需要我再尝试整理

## 安装
- 安装目录：/app/clickhouse
- 镜像：yandex/clickhouse-server:20.6.8.5
- 版本： v20.6.8.5
- 配置文件文档：[配置文件](https://clickhouse.com/docs/zh/operations/configuration-files)
- 端口说明：[Network ports](https://clickhouse.com/docs/en/guides/sre/network-ports) ，单机部署可以就暴露 8123（连接），9363(prometheus );ps:如果使用 Archery v1.10 连接需要使用 9000 端口
    -   ![](devops_docker_clickhouse_install/662652-20231006011925327-568344949.png)
    
### 获取默认配置文件
默认配置文件： config.xml, users.xml  

1. 从容器内拷贝配置文件到容器外部主机
    (创建 work 目录，进入运行的 clickhouse 容器后会将默认的配置文件(config.xml, users.xml)复制到 work 目录)
    -   ```
        创建容器获取容器内的默认配置文件
        mkdir ./work
        docker run -it --rm --entrypoint=/bin/bash -v ./work:/work --privileged=true --user=root yandex/clickhouse-server:20.6.8.5
        进入容器后复制配置到work文件夹
        cp -r /etc/clickhouse-server/* /work
        exit
        ```
2. ./work/config.xml
    -   ```
        <?xml version="1.0"?>
        <!--
          NOTE: User and query level settings are set up in "users.xml" file.
          If you have accidentially specified user-level settings here, server won't start.
          You can either move the settings to the right place inside "users.xml" file
           or add <skip_check_for_incorrect_settings>1</skip_check_for_incorrect_settings> here.
        -->
        <yandex>
            <logger>
                <!-- Possible levels: https://github.com/pocoproject/poco/blob/poco-1.9.4-release/Foundation/include/Poco/Logger.h#L105 -->
                <level>trace</level>
                <log>/var/log/clickhouse-server/clickhouse-server.log</log>
                <errorlog>/var/log/clickhouse-server/clickhouse-server.err.log</errorlog>
                <size>1000M</size>
                <count>10</count>
                <!-- <console>1</console> --> <!-- Default behavior is autodetection (log to console if not daemon mode and is tty) -->

                <!-- Per level overrides (legacy):

                For example to suppress logging of the ConfigReloader you can use:
                NOTE: levels.logger is reserved, see below.
                -->
                <!--
                <levels>
                  <ConfigReloader>none</ConfigReloader>
                </levels>
                -->

                <!-- Per level overrides:

                For example to suppress logging of the RBAC for default user you can use:
                (But please note that the logger name maybe changed from version to version, even after minor upgrade)
                -->
                <!--
                <levels>
                  <logger>
                    <name>ContextAccess (default)</name>
                    <level>none</level>
                  </logger>
                  <logger>
                    <name>DatabaseOrdinary (test)</name>
                    <level>none</level>
                  </logger>
                </levels>
                -->
            </logger>

            <send_crash_reports>
                <!-- Changing <enabled> to true allows sending crash reports to -->
                <!-- the ClickHouse core developers team via Sentry https://sentry.io -->
                <!-- Doing so at least in pre-production environments is highly appreciated -->
                <enabled>false</enabled>
                <!-- Change <anonymize> to true if you don't feel comfortable attaching the server hostname to the crash report -->
                <anonymize>false</anonymize>
                <!-- Default endpoint should be changed to different Sentry DSN only if you have -->
                <!-- some in-house engineers or hired consultants who're going to debug ClickHouse issues for you -->
                <endpoint>https://6f33034cfe684dd7a3ab9875e57b1c8d@o388870.ingest.sentry.io/5226277</endpoint>
            </send_crash_reports>

            <!--display_name>production</display_name--> <!-- It is the name that will be shown in the client -->
            <http_port>8123</http_port>
            <tcp_port>9000</tcp_port>
            <mysql_port>9004</mysql_port>
            <!-- For HTTPS and SSL over native protocol. -->
            <!--
            <https_port>8443</https_port>
            <tcp_port_secure>9440</tcp_port_secure>
            -->
            <!-- Used with https_port and tcp_port_secure. Full ssl options list: https://github.com/ClickHouse-Extras/poco/blob/master/NetSSL_OpenSSL/include/Poco/Net/SSLManager.h#L71 -->
            <openSSL>
                <server> <!-- Used for https server AND secure tcp port -->
                    <!-- openssl req -subj "/CN=localhost" -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/clickhouse-server/server.key -out /etc/clickhouse-server/server.crt -->
                    <certificateFile>/etc/clickhouse-server/server.crt</certificateFile>
                    <privateKeyFile>/etc/clickhouse-server/server.key</privateKeyFile>
                    <!-- openssl dhparam -out /etc/clickhouse-server/dhparam.pem 4096 -->
                    <dhParamsFile>/etc/clickhouse-server/dhparam.pem</dhParamsFile>
                    <verificationMode>none</verificationMode>
                    <loadDefaultCAFile>true</loadDefaultCAFile>
                    <cacheSessions>true</cacheSessions>
                    <disableProtocols>sslv2,sslv3</disableProtocols>
                    <preferServerCiphers>true</preferServerCiphers>
                </server>

                <client> <!-- Used for connecting to https dictionary source and secured Zookeeper communication -->
                    <loadDefaultCAFile>true</loadDefaultCAFile>
                    <cacheSessions>true</cacheSessions>
                    <disableProtocols>sslv2,sslv3</disableProtocols>
                    <preferServerCiphers>true</preferServerCiphers>
                    <!-- Use for self-signed: <verificationMode>none</verificationMode> -->
                    <invalidCertificateHandler>
                        <!-- Use for self-signed: <name>AcceptCertificateHandler</name> -->
                        <name>RejectCertificateHandler</name>
                    </invalidCertificateHandler>
                </client>
            </openSSL>

            <!-- Default root page on http[s] server. For example load UI from https://tabix.io/ when opening http://localhost:8123 -->
            <!--
            <http_server_default_response><![CDATA[<html ng-app="SMI2"><head><base href="http://ui.tabix.io/"></head><body><div ui-view="" class="content-ui"></div><script src="http://loader.tabix.io/master.js"></script></body></html>]]></http_server_default_response>
            -->

            <!-- Port for communication between replicas. Used for data exchange. -->
            <interserver_http_port>9009</interserver_http_port>

            <!-- Hostname that is used by other replicas to request this server.
                 If not specified, than it is determined analoguous to 'hostname -f' command.
                 This setting could be used to switch replication to another network interface.
              -->
            <!--
            <interserver_http_host>example.yandex.ru</interserver_http_host>
            -->

            <!-- Listen specified host. use :: (wildcard IPv6 address), if you want to accept connections both with IPv4 and IPv6 from everywhere. -->
            <!-- <listen_host>::</listen_host> -->
            <!-- Same for hosts with disabled ipv6: -->
            <!-- <listen_host>0.0.0.0</listen_host> -->

            <!-- Default values - try listen localhost on ipv4 and ipv6: -->
            <!--
            <listen_host>::1</listen_host>
            <listen_host>127.0.0.1</listen_host>
            -->
            <!-- Don't exit if ipv6 or ipv4 unavailable, but listen_host with this protocol specified -->
            <!-- <listen_try>0</listen_try> -->

            <!-- Allow listen on same address:port -->
            <!-- <listen_reuse_port>0</listen_reuse_port> -->

            <!-- <listen_backlog>64</listen_backlog> -->

            <max_connections>4096</max_connections>
            <keep_alive_timeout>3</keep_alive_timeout>

            <!-- Maximum number of concurrent queries. -->
            <max_concurrent_queries>100</max_concurrent_queries>

            <!-- Maximum memory usage (resident set size) for server process.
                 Zero value or unset means default. Default is "max_server_memory_usage_to_ram_ratio" of available physical RAM.
                 If the value is larger than "max_server_memory_usage_to_ram_ratio" of available physical RAM, it will be cut down.

                 The constraint is checked on query execution time.
                 If a query tries to allocate memory and the current memory usage plus allocation is greater
                  than specified threshold, exception will be thrown.

                 It is not practical to set this constraint to small values like just a few gigabytes,
                  because memory allocator will keep this amount of memory in caches and the server will deny service of queries.
              -->
            <max_server_memory_usage>0</max_server_memory_usage>

            <!-- Maximum number of threads in the Global thread pool.
            This will default to a maximum of 10000 threads if not specified.
            This setting will be useful in scenarios where there are a large number
            of distributed queries that are running concurrently but are idling most
            of the time, in which case a higher number of threads might be required.
            -->

             <max_thread_pool_size>10000</max_thread_pool_size>

            <!-- On memory constrained environments you may have to set this to value larger than 1.
              -->
            <max_server_memory_usage_to_ram_ratio>0.9</max_server_memory_usage_to_ram_ratio>

            <!-- Simple server-wide memory profiler. Collect a stack trace at every peak allocation step (in bytes).
                 Data will be stored in system.trace_log table with query_id = empty string.
                 Zero means disabled.
              -->
            <total_memory_profiler_step>4194304</total_memory_profiler_step>

            <!-- Collect random allocations and deallocations and write them into system.trace_log with 'MemorySample' trace_type.
                 The probability is for every alloc/free regardless to the size of the allocation.
                 Note that sampling happens only when the amount of untracked memory exceeds the untracked memory limit,
                  which is 4 MiB by default but can be lowered if 'total_memory_profiler_step' is lowered.
                 You may want to set 'total_memory_profiler_step' to 1 for extra fine grained sampling.
              -->
            <total_memory_tracker_sample_probability>0</total_memory_tracker_sample_probability>

            <!-- Set limit on number of open files (default: maximum). This setting makes sense on Mac OS X because getrlimit() fails to retrieve
                 correct maximum value. -->
            <!-- <max_open_files>262144</max_open_files> -->

            <!-- Size of cache of uncompressed blocks of data, used in tables of MergeTree family.
                 In bytes. Cache is single for server. Memory is allocated only on demand.
                 Cache is used when 'use_uncompressed_cache' user setting turned on (off by default).
                 Uncompressed cache is advantageous only for very short queries and in rare cases.
              -->
            <uncompressed_cache_size>8589934592</uncompressed_cache_size>

            <!-- Approximate size of mark cache, used in tables of MergeTree family.
                 In bytes. Cache is single for server. Memory is allocated only on demand.
                 You should not lower this value.
              -->
            <mark_cache_size>5368709120</mark_cache_size>

            <!-- Path to data directory, with trailing slash. -->
            <path>/var/lib/clickhouse/</path>

            <!-- Path to temporary data for processing hard queries. -->
            <tmp_path>/var/lib/clickhouse/tmp/</tmp_path>

            <!-- Policy from the <storage_configuration> for the temporary files.
                 If not set <tmp_path> is used, otherwise <tmp_path> is ignored.

                 Notes:
                 - move_factor              is ignored
                 - keep_free_space_bytes    is ignored
                 - max_data_part_size_bytes is ignored
                 - you must have exactly one volume in that policy
            -->
            <!-- <tmp_policy>tmp</tmp_policy> -->

            <!-- Directory with user provided files that are accessible by 'file' table function. -->
            <user_files_path>/var/lib/clickhouse/user_files/</user_files_path>

            <!-- Path to folder where users and roles created by SQL commands are stored. -->
            <access_control_path>/var/lib/clickhouse/access/</access_control_path>

            <!-- Path to configuration file with users, access rights, profiles of settings, quotas. -->
            <users_config>users.xml</users_config>

            <!-- Default profile of settings. -->
            <default_profile>default</default_profile>

            <!-- System profile of settings. This settings are used by internal processes (Buffer storage, Distibuted DDL worker and so on). -->
            <!-- <system_profile>default</system_profile> -->

            <!-- Default database. -->
            <default_database>default</default_database>

            <!-- Server time zone could be set here.

                 Time zone is used when converting between String and DateTime types,
                  when printing DateTime in text formats and parsing DateTime from text,
                  it is used in date and time related functions, if specific time zone was not passed as an argument.

                 Time zone is specified as identifier from IANA time zone database, like UTC or Africa/Abidjan.
                 If not specified, system time zone at server startup is used.

                 Please note, that server could display time zone alias instead of specified name.
                 Example: W-SU is an alias for Europe/Moscow and Zulu is an alias for UTC.
            -->
            <!-- <timezone>Europe/Moscow</timezone> -->

            <!-- You can specify umask here (see "man umask"). Server will apply it on startup.
                 Number is always parsed as octal. Default umask is 027 (other users cannot read logs, data files, etc; group can only read).
            -->
            <!-- <umask>022</umask> -->

            <!-- Perform mlockall after startup to lower first queries latency
                  and to prevent clickhouse executable from being paged out under high IO load.
                 Enabling this option is recommended but will lead to increased startup time for up to a few seconds.
            -->
            <mlock_executable>true</mlock_executable>

            <!-- Configuration of clusters that could be used in Distributed tables.
                 https://clickhouse.tech/docs/en/operations/table_engines/distributed/
              -->
            <remote_servers incl="clickhouse_remote_servers" >
                <!-- Test only shard config for testing distributed storage -->
                <test_shard_localhost>
                    <shard>
                        <!-- Optional. Whether to write data to just one of the replicas. Default: false (write data to all replicas). -->
                        <!-- <internal_replication>false</internal_replication> -->
                        <!-- Optional. Shard weight when writing data. Default: 1. -->
                        <!-- <weight>1</weight> -->
                        <replica>
                            <host>localhost</host>
                            <port>9000</port>
                            <!-- Optional. Priority of the replica for load_balancing. Default: 1 (less value has more priority). -->
                            <!-- <priority>1</priority> -->
                        </replica>
                    </shard>
                </test_shard_localhost>
                <test_cluster_two_shards_localhost>
                     <shard>
                         <replica>
                             <host>localhost</host>
                             <port>9000</port>
                         </replica>
                     </shard>
                     <shard>
                         <replica>
                             <host>localhost</host>
                             <port>9000</port>
                         </replica>
                     </shard>
                </test_cluster_two_shards_localhost>
                <test_cluster_two_shards>
                    <shard>
                        <replica>
                            <host>127.0.0.1</host>
                            <port>9000</port>
                        </replica>
                    </shard>
                    <shard>
                        <replica>
                            <host>127.0.0.2</host>
                            <port>9000</port>
                        </replica>
                    </shard>
                </test_cluster_two_shards>
                <test_shard_localhost_secure>
                    <shard>
                        <replica>
                            <host>localhost</host>
                            <port>9440</port>
                            <secure>1</secure>
                        </replica>
                    </shard>
                </test_shard_localhost_secure>
                <test_unavailable_shard>
                    <shard>
                        <replica>
                            <host>localhost</host>
                            <port>9000</port>
                        </replica>
                    </shard>
                    <shard>
                        <replica>
                            <host>localhost</host>
                            <port>1</port>
                        </replica>
                    </shard>
                </test_unavailable_shard>
            </remote_servers>

            <!-- The list of hosts allowed to use in URL-related storage engines and table functions.
                If this section is not present in configuration, all hosts are allowed.
            -->
            <remote_url_allow_hosts>
                <!-- Host should be specified exactly as in URL. The name is checked before DNS resolution.
                    Example: "yandex.ru", "yandex.ru." and "www.yandex.ru" are different hosts.
                            If port is explicitly specified in URL, the host:port is checked as a whole.
                            If host specified here without port, any port with this host allowed.
                            "yandex.ru" -> "yandex.ru:443", "yandex.ru:80" etc. is allowed, but "yandex.ru:80" -> only "yandex.ru:80" is allowed.
                    If the host is specified as IP address, it is checked as specified in URL. Example: "[2a02:6b8:a::a]".
                    If there are redirects and support for redirects is enabled, every redirect (the Location field) is checked.
                -->

                <!-- Regular expression can be specified. RE2 engine is used for regexps.
                    Regexps are not aligned: don't forget to add ^ and $. Also don't forget to escape dot (.) metacharacter
                    (forgetting to do so is a common source of error).
                -->
            </remote_url_allow_hosts>

            <!-- If element has 'incl' attribute, then for it's value will be used corresponding substitution from another file.
                 By default, path to file with substitutions is /etc/metrika.xml. It could be changed in config in 'include_from' element.
                 Values for substitutions are specified in /yandex/name_of_substitution elements in that file.
              -->

            <!-- ZooKeeper is used to store metadata about replicas, when using Replicated tables.
                 Optional. If you don't use replicated tables, you could omit that.

                 See https://clickhouse.yandex/docs/en/table_engines/replication/
              -->

            <zookeeper incl="zookeeper-servers" optional="true" />

            <!-- Substitutions for parameters of replicated tables.
                  Optional. If you don't use replicated tables, you could omit that.

                 See https://clickhouse.yandex/docs/en/table_engines/replication/#creating-replicated-tables
              -->
            <macros incl="macros" optional="true" />

            <!-- Reloading interval for embedded dictionaries, in seconds. Default: 3600. -->
            <builtin_dictionaries_reload_interval>3600</builtin_dictionaries_reload_interval>

            <!-- Maximum session timeout, in seconds. Default: 3600. -->
            <max_session_timeout>3600</max_session_timeout>

            <!-- Default session timeout, in seconds. Default: 60. -->
            <default_session_timeout>60</default_session_timeout>

            <!-- Sending data to Graphite for monitoring. Several sections can be defined. -->
            <!--
                interval - send every X second
                root_path - prefix for keys
                hostname_in_path - append hostname to root_path (default = true)
                metrics - send data from table system.metrics
                events - send data from table system.events
                asynchronous_metrics - send data from table system.asynchronous_metrics
            -->
            <!--
            <graphite>
                <host>localhost</host>
                <port>42000</port>
                <timeout>0.1</timeout>
                <interval>60</interval>
                <root_path>one_min</root_path>
                <hostname_in_path>true</hostname_in_path>

                <metrics>true</metrics>
                <events>true</events>
                <events_cumulative>false</events_cumulative>
                <asynchronous_metrics>true</asynchronous_metrics>
            </graphite>
            <graphite>
                <host>localhost</host>
                <port>42000</port>
                <timeout>0.1</timeout>
                <interval>1</interval>
                <root_path>one_sec</root_path>

                <metrics>true</metrics>
                <events>true</events>
                <events_cumulative>false</events_cumulative>
                <asynchronous_metrics>false</asynchronous_metrics>
            </graphite>
            -->

            <!-- Serve endpoint fot Prometheus monitoring. -->
            <!--
                endpoint - mertics path (relative to root, statring with "/")
                port - port to setup server. If not defined or 0 than http_port used
                metrics - send data from table system.metrics
                events - send data from table system.events
                asynchronous_metrics - send data from table system.asynchronous_metrics
                status_info - send data from different component from CH, ex: Dictionaries status
            -->
            <!--
            <prometheus>
                <endpoint>/metrics</endpoint>
                <port>9363</port>

                <metrics>true</metrics>
                <events>true</events>
                <asynchronous_metrics>true</asynchronous_metrics>
                <status_info>true</status_info>
            </prometheus>
            -->

            <!-- Query log. Used only for queries with setting log_queries = 1. -->
            <query_log>
                <!-- What table to insert data. If table is not exist, it will be created.
                     When query log structure is changed after system update,
                      then old table will be renamed and new table will be created automatically.
                -->
                <database>system</database>
                <table>query_log</table>
                <!--
                    PARTITION BY expr https://clickhouse.yandex/docs/en/table_engines/custom_partitioning_key/
                    Example:
                        event_date
                        toMonday(event_date)
                        toYYYYMM(event_date)
                        toStartOfHour(event_time)
                -->
                <partition_by>toYYYYMM(event_date)</partition_by>

                <!-- Instead of partition_by, you can provide full engine expression (starting with ENGINE = ) with parameters,
                     Example: <engine>ENGINE = MergeTree PARTITION BY toYYYYMM(event_date) ORDER BY (event_date, event_time) SETTINGS index_granularity = 1024</engine>
                  -->

                <!-- Interval of flushing data. -->
                <flush_interval_milliseconds>7500</flush_interval_milliseconds>
            </query_log>

            <!-- Trace log. Stores stack traces collected by query profilers.
                 See query_profiler_real_time_period_ns and query_profiler_cpu_time_period_ns settings. -->
            <trace_log>
                <database>system</database>
                <table>trace_log</table>

                <partition_by>toYYYYMM(event_date)</partition_by>
                <flush_interval_milliseconds>7500</flush_interval_milliseconds>
            </trace_log>

            <!-- Query thread log. Has information about all threads participated in query execution.
                 Used only for queries with setting log_query_threads = 1. -->
            <query_thread_log>
                <database>system</database>
                <table>query_thread_log</table>
                <partition_by>toYYYYMM(event_date)</partition_by>
                <flush_interval_milliseconds>7500</flush_interval_milliseconds>
            </query_thread_log>

            <!-- Uncomment if use part log.
                 Part log contains information about all actions with parts in MergeTree tables (creation, deletion, merges, downloads).
            <part_log>
                <database>system</database>
                <table>part_log</table>
                <flush_interval_milliseconds>7500</flush_interval_milliseconds>
            </part_log>
            -->

            <!-- Uncomment to write text log into table.
                 Text log contains all information from usual server log but stores it in structured and efficient way.
                 The level of the messages that goes to the table can be limited (<level>), if not specified all messages will go to the table.
            <text_log>
                <database>system</database>
                <table>text_log</table>
                <flush_interval_milliseconds>7500</flush_interval_milliseconds>
                <level></level>
            </text_log>
            -->

            <!-- Metric log contains rows with current values of ProfileEvents, CurrentMetrics collected with "collect_interval_milliseconds" interval. -->
            <metric_log>
                <database>system</database>
                <table>metric_log</table>
                <flush_interval_milliseconds>7500</flush_interval_milliseconds>
                <collect_interval_milliseconds>1000</collect_interval_milliseconds>
            </metric_log>

            <!--
                Asynchronous metric log contains values of metrics from
                system.asynchronous_metrics.
            -->
            <asynchronous_metric_log>
                <database>system</database>
                <table>asynchronous_metric_log</table>
                <!--
                    Asynchronous metrics are updated once a minute, so there is
                    no need to flush more often.
                -->
                <flush_interval_milliseconds>60000</flush_interval_milliseconds>
            </asynchronous_metric_log>

            <!-- Parameters for embedded dictionaries, used in Yandex.Metrica.
                 See https://clickhouse.yandex/docs/en/dicts/internal_dicts/
            -->

            <!-- Path to file with region hierarchy. -->
            <!-- <path_to_regions_hierarchy_file>/opt/geo/regions_hierarchy.txt</path_to_regions_hierarchy_file> -->

            <!-- Path to directory with files containing names of regions -->
            <!-- <path_to_regions_names_files>/opt/geo/</path_to_regions_names_files> -->

            <!-- Configuration of external dictionaries. See:
                 https://clickhouse.yandex/docs/en/dicts/external_dicts/
            -->
            <dictionaries_config>*_dictionary.xml</dictionaries_config>

            <!-- Uncomment if you want data to be compressed 30-100% better.
                 Don't do that if you just started using ClickHouse.
              -->
            <compression incl="clickhouse_compression">
            <!--
                <!- - Set of variants. Checked in order. Last matching case wins. If nothing matches, lz4 will be used. - ->
                <case>

                    <!- - Conditions. All must be satisfied. Some conditions may be omitted. - ->
                    <min_part_size>10000000000</min_part_size>        <!- - Min part size in bytes. - ->
                    <min_part_size_ratio>0.01</min_part_size_ratio>   <!- - Min size of part relative to whole table size. - ->

                    <!- - What compression method to use. - ->
                    <method>zstd</method>
                </case>
            -->
            </compression>

            <!-- Allow to execute distributed DDL queries (CREATE, DROP, ALTER, RENAME) on cluster.
                 Works only if ZooKeeper is enabled. Comment it if such functionality isn't required. -->
            <distributed_ddl>
                <!-- Path in ZooKeeper to queue with DDL queries -->
                <path>/clickhouse/task_queue/ddl</path>

                <!-- Settings from this profile will be used to execute DDL queries -->
                <!-- <profile>default</profile> -->
            </distributed_ddl>

            <!-- Settings to fine tune MergeTree tables. See documentation in source code, in MergeTreeSettings.h -->
            <!--
            <merge_tree>
                <max_suspicious_broken_parts>5</max_suspicious_broken_parts>
            </merge_tree>
            -->

            <!-- Protection from accidental DROP.
                 If size of a MergeTree table is greater than max_table_size_to_drop (in bytes) than table could not be dropped with any DROP query.
                 If you want do delete one table and don't want to change clickhouse-server config, you could create special file <clickhouse-path>/flags/force_drop_table and make DROP once.
                 By default max_table_size_to_drop is 50GB; max_table_size_to_drop=0 allows to DROP any tables.
                 The same for max_partition_size_to_drop.
                 Uncomment to disable protection.
            -->
            <!-- <max_table_size_to_drop>0</max_table_size_to_drop> -->
            <!-- <max_partition_size_to_drop>0</max_partition_size_to_drop> -->

            <!-- Example of parameters for GraphiteMergeTree table engine -->
            <graphite_rollup_example>
                <pattern>
                    <regexp>click_cost</regexp>
                    <function>any</function>
                    <retention>
                        <age>0</age>
                        <precision>3600</precision>
                    </retention>
                    <retention>
                        <age>86400</age>
                        <precision>60</precision>
                    </retention>
                </pattern>
                <default>
                    <function>max</function>
                    <retention>
                        <age>0</age>
                        <precision>60</precision>
                    </retention>
                    <retention>
                        <age>3600</age>
                        <precision>300</precision>
                    </retention>
                    <retention>
                        <age>86400</age>
                        <precision>3600</precision>
                    </retention>
                </default>
            </graphite_rollup_example>

            <!-- Directory in <clickhouse-path> containing schema files for various input formats.
                 The directory will be created if it doesn't exist.
              -->
            <format_schema_path>/var/lib/clickhouse/format_schemas/</format_schema_path>

            <!-- Uncomment to use query masking rules.
                name - name for the rule (optional)
                regexp - RE2 compatible regular expression (mandatory)
                replace - substitution string for sensitive data (optional, by default - six asterisks)
            <query_masking_rules>
                <rule>
                    <name>hide SSN</name>
                    <regexp>\b\d{3}-\d{2}-\d{4}\b</regexp>
                    <replace>000-00-0000</replace>
                </rule>
            </query_masking_rules>
            -->

            <!-- Uncomment to use custom http handlers.
                rules are checked from top to bottom, first match runs the handler
                    url - to match request URL, you can use 'regex:' prefix to use regex match(optional)
                    methods - to match request method, you can use commas to separate multiple method matches(optional)
                    headers - to match request headers, match each child element(child element name is header name), you can use 'regex:' prefix to use regex match(optional)
                handler is request handler
                    type - supported types: static, dynamic_query_handler, predefined_query_handler
                    query - use with predefined_query_handler type, executes query when the handler is called
                    query_param_name - use with dynamic_query_handler type, extracts and executes the value corresponding to the <query_param_name> value in HTTP request params
                    status - use with static type, response status code
                    content_type - use with static type, response content-type
                    response_content - use with static type, Response content sent to client, when using the prefix 'file://' or 'config://', find the content from the file or configuration send to client.

            <http_handlers>
                <rule>
                    <url>/</url>
                    <methods>POST,GET</methods>
                    <headers><pragma>no-cache</pragma></headers>
                    <handler>
                        <type>dynamic_query_handler</type>
                        <query_param_name>query</query_param_name>
                    </handler>
                </rule>

                <rule>
                    <url>/predefined_query</url>
                    <methods>POST,GET</methods>
                    <handler>
                        <type>predefined_query_handler</type>
                        <query>SELECT * FROM system.settings</query>
                    </handler>
                </rule>

                <rule>
                    <handler>
                        <type>static</type>
                        <status>200</status>
                        <content_type>text/plain; charset=UTF-8</content_type>
                        <response_content>config://http_server_default_response</response_content>
                    </handler>
                </rule>
            </http_handlers>
            -->

            <!-- Uncomment to disable ClickHouse internal DNS caching. -->
            <!-- <disable_internal_dns_cache>1</disable_internal_dns_cache> -->
        </yandex>
        ```
3. ./work/users.xml
    -   ```
        <?xml version="1.0"?>
        <yandex>
            <!-- Profiles of settings. -->
            <profiles>
                <!-- Default settings. -->
                <default>
                    <!-- Maximum memory usage for processing single query, in bytes. -->
                    <max_memory_usage>10000000000</max_memory_usage>

                    <!-- Use cache of uncompressed blocks of data. Meaningful only for processing many of very short queries. -->
                    <use_uncompressed_cache>0</use_uncompressed_cache>

                    <!-- How to choose between replicas during distributed query processing.
                         random - choose random replica from set of replicas with minimum number of errors
                         nearest_hostname - from set of replicas with minimum number of errors, choose replica
                          with minimum number of different symbols between replica's hostname and local hostname
                          (Hamming distance).
                         in_order - first live replica is chosen in specified order.
                         first_or_random - if first replica one has higher number of errors, pick a random one from replicas with minimum number of errors.
                    -->
                    <load_balancing>random</load_balancing>
                </default>

                <!-- Profile that allows only read queries. -->
                <readonly>
                    <readonly>1</readonly>
                </readonly>
            </profiles>

            <!-- Users and ACL. -->
            <users>
                <!-- If user name was not specified, 'default' user is used. -->
                <default>
                    <!-- Password could be specified in plaintext or in SHA256 (in hex format).

                         If you want to specify password in plaintext (not recommended), place it in 'password' element.
                         Example: <password>qwerty</password>.
                         Password could be empty.

                         If you want to specify SHA256, place it in 'password_sha256_hex' element.
                         Example: <password_sha256_hex>65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5</password_sha256_hex>
                         Restrictions of SHA256: impossibility to connect to ClickHouse using MySQL JS client (as of July 2019).

                         If you want to specify double SHA1, place it in 'password_double_sha1_hex' element.
                         Example: <password_double_sha1_hex>e395796d6546b1b65db9d665cd43f0e858dd4303</password_double_sha1_hex>

                         How to generate decent password:
                         Execute: PASSWORD=$(base64 < /dev/urandom | head -c8); echo "$PASSWORD"; echo -n "$PASSWORD" | sha256sum | tr -d '-'
                         In first line will be password and in second - corresponding SHA256.

                         How to generate double SHA1:
                         Execute: PASSWORD=$(base64 < /dev/urandom | head -c8); echo "$PASSWORD"; echo -n "$PASSWORD" | sha1sum | tr -d '-' | xxd -r -p | sha1sum | tr -d '-'
                         In first line will be password and in second - corresponding double SHA1.
                    -->
                    <password></password>

                    <!-- List of networks with open access.

                         To open access from everywhere, specify:
                            <ip>::/0</ip>

                         To open access only from localhost, specify:
                            <ip>::1</ip>
                            <ip>127.0.0.1</ip>

                         Each element of list has one of the following forms:
                         <ip> IP-address or network mask. Examples: 213.180.204.3 or 10.0.0.1/8 or 10.0.0.1/255.255.255.0
                             2a02:6b8::3 or 2a02:6b8::3/64 or 2a02:6b8::3/ffff:ffff:ffff:ffff::.
                         <host> Hostname. Example: server01.yandex.ru.
                             To check access, DNS query is performed, and all received addresses compared to peer address.
                         <host_regexp> Regular expression for host names. Example, ^server\d\d-\d\d-\d.yandex.ru$
                             To check access, DNS PTR query is performed for peer address and then regexp is applied.
                             Then, for result of PTR query, another DNS query is performed and all received addresses compared to peer address.
                             Strongly recommended that regexp is ends with $
                         All results of DNS requests are cached till server restart.
                    -->
                    <networks incl="networks" replace="replace">
                        <ip>::/0</ip>
                    </networks>

                    <!-- Settings profile for user. -->
                    <profile>default</profile>

                    <!-- Quota for user. -->
                    <quota>default</quota>

                    <!-- User can create other users and grant rights to them. -->
                    <!-- <access_management>1</access_management> -->
                </default>
            </users>

            <!-- Quotas. -->
            <quotas>
                <!-- Name of quota. -->
                <default>
                    <!-- Limits for time interval. You could specify many intervals with different limits. -->
                    <interval>
                        <!-- Length of interval. -->
                        <duration>3600</duration>

                        <!-- No limits. Just calculate resource usage for time interval. -->
                        <queries>0</queries>
                        <errors>0</errors>
                        <result_rows>0</result_rows>
                        <read_rows>0</read_rows>
                        <execution_time>0</execution_time>
                    </interval>
                </default>
            </quotas>
        </yandex>
        ```

### 添加自定义配置

[自定义配置文件文档](https://clickhouse.com/docs/zh/operations/configuration-files)，自定义放到 config.d/*.xml，用户配置放到 users.d/*.xml

1. 添加集群配置文件：metrika.xml (单机版)

    -   ```
        <?xml version="1.0"?>
        <yandex> 
            <!-- clickhouse_remote_servers -->
            <clickhouse_remote_servers>
            </clickhouse_remote_servers>
         
            <!-- ZK  -->
            <zookeeper-servers>
            </zookeeper-servers>
         
            <networks>
                <ip>0.0.0.0/0</ip>
            </networks>
         
            <!-- clickhouse_compression  -->
            <clickhouse_compression>
                <case>
                    <min_part_size>10000000000</min_part_size>
                    <min_part_size_ratio>0.01</min_part_size_ratio>
                    <method>lz4</method>
                </case>
            </clickhouse_compression>
         
        </yandex>
        ```

2. 添加自定义的配置文件：config.d/docker_related_config.xml(日志配置，端口配置，prometheus 配置,集群设置(移除))
    -   ```
        <yandex>
            <!-- 日志 -->
            <logger>
                <level>error</level>
                <log>/var/log/clickhouse-server/clickhouse-server.log</log>
                <errorlog>/var/log/clickhouse-server/clickhouse-server.err.log</errorlog>
                <size>1000M</size>
                <count>10</count>
            </logger>
            <!--由 JDBC、ODBC 和 Web 界面使用。-->
            <http_port>8123</http_port>
            <!-- 本机协议端口 -->
            <tcp_port>9000</tcp_port>
            <!-- MySQL 仿真端口 -->
            <mysql_port>9004</mysql_port>
            <listen_host>0.0.0.0</listen_host>
            <!-- 时区 -->
            <!-- <timezone>Asia/Shanghai</timezone> -->
            <!-- prometheus -->
            <prometheus>
                <endpoint>/metrics</endpoint>
                <port>9363</port>
                <metrics>true</metrics>
                <events>true</events>
                <asynchronous_metrics>true</asynchronous_metrics>
                <status_info>true</status_info>
            </prometheus>
            <!-- 用户配置 -->
            <users_config>users.xml</users_config>
            <!--集群设置-->
            <include_from>/etc/clickhouse-server/metrika.xml</include_from>
            <remote_servers incl="clickhouse_remote_servers" replace="replace"></remote_servers>
        </yandex>
        ```

3. 添加自定义配置 users.d/docker_related_config.xml 配置，账号 default 密码 devops666 ，启用权限控制
    -   ```
        <yandex>
            <users replace="replace">
                <default>
                    <password>devops666</password>
                    <networks incl="networks" replace="replace">
                        <ip>::/0</ip>
                    </networks>
                    <profile>default</profile>
                    <quota>default</quota>
                    <access_management>1</access_management>
                </default>
            </users>
        </yandex>
        ```

### docker-compose 配置文件
- 指定时区：Asia/Shanghai
- 指定端口：8123,9363
- 挂载目录：./data ./logs ./config
- 运行 compose.yml 构建: `docker compose up -d`

    -   ``` yaml
        version: '3'
        services:
          clickhouse-server:
            container_name: db_clickhouse_20_6
            image: yandex/clickhouse-server:20.6.8.5
            restart: always
            ulimits:
              nofile:
                soft: 262144
                hard: 262144
            environment:
              - TZ=Asia/Shanghai
              - ports=8123,9363
            ports:
              - 8123:8123
              - 9363:9363
            volumes:
              - ./data:/var/lib/clickhouse
              - ./logs:/var/log/clickhouse-server
              - ./config:/etc/clickhouse-server
        ```
  -   运行示例
    -   ![](devops_docker_clickhouse_install/662652-20231006011925260-1213425080.png)

最后连接部分参考前篇 [DBeaver Ultimate 22.1.0 连接数据库(MySQL+Mongo+Clickhouse)](https://juejin.cn/post/7285290243297837108)

### 后语
很极限的一天，前几天就开始研究整理，今天回来灵感爆发完成构建，配置这一块一直有点迷糊，还是需要多看看文档才行
