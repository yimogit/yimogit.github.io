import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as t,o as i}from"./app-f_uNzTRF.js";const r={};function n(o,e){return i(),a("div",null,e[0]||(e[0]=[t('<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><ul><li><a href="https://www.bilibili.com/video/BV1tK411p71q" target="_blank" rel="noopener noreferrer">B站视频</a></li><li><a href="https://note.youdao.com/ynoteshare/index.html?id=8fdbaddd7329d67f1e43b3338f35ceaf&amp;type=note&amp;_time=1644499184108" target="_blank" rel="noopener noreferrer">PPT</a></li><li><a href="https://zhuanlan.zhihu.com/p/60288391" target="_blank" rel="noopener noreferrer">参考文章</a></li></ul><h2 id="为什么要使用消息队列" tabindex="-1"><a class="header-anchor" href="#为什么要使用消息队列"><span>为什么要使用消息队列</span></a></h2><blockquote><p>主要考察应用场景及优缺点</p></blockquote><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点"><span>优点</span></a></h3><blockquote><ul><li>解耦: 不同服务间的调用</li><li>异步：不同系统间的调用</li><li>消峰：秒杀等场景，平时量不高，但在特定时间会有大量请求的情况，配置基础服务器资源，并引入MQ平滑处理请求，亦节约了成本。</li></ul></blockquote><h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span>缺点</span></a></h3><ul><li>可用性降低: 依赖于MQ，若MQ异常，将导致业务异常甚至系统崩溃</li><li>复杂度提高：需要考虑消息丢失，重复消费等问题</li><li>一致性问题：多个队列同时操作，部分消费失败的问题，异步的处理返回给用户是成功</li></ul><h2 id="消息队列产品比较" tabindex="-1"><a class="header-anchor" href="#消息队列产品比较"><span>消息队列产品比较</span></a></h2><blockquote><p>如何根据特点进行取舍</p></blockquote><ul><li>ActiveMQ:万级吞吐量，Java开发，时效性ms级,不怎么维护了，已不建议使用</li><li>RabbitMQ:万级吞吐量，ErLang开发，时效性us级 社区活跃度高，健壮、稳定、易用、跨平台、支持多种语言、文档齐全，对于.net更友好，使用较多；建议中小型项目使用</li><li>KafKa：十万级吞吐量，Scala/Java开发，时效性ms级,性能卓越，分布式可用性高，性能卓越，被大多数日志，大数据领域使用；消费失败不支持重试，使用短轮询方式，实时性取决于轮询间隔时间，支持消息顺序，但是一台代理宕机后，就会产生消息乱序。日志采集等服务建议使用</li><li>RocketMQ：十万级吞吐量，Java开发，时效性ms级，可用性非常高，分布式架构，消息可靠性高，支持10亿级别的消息堆积，不会因为堆积导致性能下降；客户端支持不完善，且阿里的云服务linux只支持http模式访问。大型项目建议使用</li></ul><h2 id="消息队列的高可用" tabindex="-1"><a class="header-anchor" href="#消息队列的高可用"><span>消息队列的高可用</span></a></h2><ul><li>镜像集群(RabbitMQ)：多个节点队列，同步数据，保证数据完整</li><li>分布式部署(RocketMQ):使用双主双从，保证都有备份</li></ul><h2 id="消息丢失问题" tabindex="-1"><a class="header-anchor" href="#消息丢失问题"><span>消息丢失问题</span></a></h2><h3 id="消息丢失的原因" tabindex="-1"><a class="header-anchor" href="#消息丢失的原因"><span>消息丢失的原因</span></a></h3><ul><li>生产者到MQ，发送过程中丢失</li><li>MQ收到消息，未持久化</li><li>消费者渠道消息，未处理成功</li></ul><h3 id="如何让消息不丢失" tabindex="-1"><a class="header-anchor" href="#如何让消息不丢失"><span>如何让消息不丢失</span></a></h3><ul><li>发送消息后应confirm确认</li><li>收到消息后持久化</li><li>消费者消息处理完毕后手动进行ack确认，确认后mq再删除消息</li></ul><h2 id="重复消费问题" tabindex="-1"><a class="header-anchor" href="#重复消费问题"><span>重复消费问题</span></a></h2><ul><li>无法避免，消费者取到消息后，可能因网络波动无法收到确认状态，这时消息将会再次被消费</li><li>消费者应保证消息的幂等性(可以被重复多次消费)</li><li>添加全局消息ID，消费时根据消息ID添加状态锁，处理成功后清理锁</li></ul><h2 id="消息的顺序性" tabindex="-1"><a class="header-anchor" href="#消息的顺序性"><span>消息的顺序性</span></a></h2><ul><li>分段锁，确保同一业务在一个队列，因先进先出的原理，即可保证消费顺序</li></ul><h2 id="分布式事务实现" tabindex="-1"><a class="header-anchor" href="#分布式事务实现"><span>分布式事务实现</span></a></h2><ul><li>使用本地消息记录消息的消费状态，消费后，回写消息状态，变更本地消息记录表</li><li>使用定时任务定时查询本地表消费是否完成，未完成则继续发送消息到MQ，达到最终一致性。</li></ul>',24)]))}const d=l(r,[["render",n],["__file","message_queue_study_records.html.vue"]]),c=JSON.parse('{"path":"/posts/developer/message_queue_study_records.html","title":"消息队列学习记录","lang":"zh-CN","frontmatter":{"title":"消息队列学习记录","date":"2022-02-27T18:55:00.000Z","category":["Developer"],"tag":["队列"],"description":"参考 B站视频 PPT 参考文章 为什么要使用消息队列 主要考察应用场景及优缺点 优点 解耦: 不同服务间的调用 异步：不同系统间的调用 消峰：秒杀等场景，平时量不高，但在特定时间会有大量请求的情况，配置基础服务器资源，并引入MQ平滑处理请求，亦节约了成本。 缺点 可用性降低: 依赖于MQ，若MQ异常，将导致业务异常甚至系统崩溃 复杂度提高：需要考虑消...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/message_queue_study_records.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"消息队列学习记录"}],["meta",{"property":"og:description","content":"参考 B站视频 PPT 参考文章 为什么要使用消息队列 主要考察应用场景及优缺点 优点 解耦: 不同服务间的调用 异步：不同系统间的调用 消峰：秒杀等场景，平时量不高，但在特定时间会有大量请求的情况，配置基础服务器资源，并引入MQ平滑处理请求，亦节约了成本。 缺点 可用性降低: 依赖于MQ，若MQ异常，将导致业务异常甚至系统崩溃 复杂度提高：需要考虑消..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"队列"}],["meta",{"property":"article:published_time","content":"2022-02-27T18:55:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"消息队列学习记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-27T18:55:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]},{"level":2,"title":"为什么要使用消息队列","slug":"为什么要使用消息队列","link":"#为什么要使用消息队列","children":[{"level":3,"title":"优点","slug":"优点","link":"#优点","children":[]},{"level":3,"title":"缺点","slug":"缺点","link":"#缺点","children":[]}]},{"level":2,"title":"消息队列产品比较","slug":"消息队列产品比较","link":"#消息队列产品比较","children":[]},{"level":2,"title":"消息队列的高可用","slug":"消息队列的高可用","link":"#消息队列的高可用","children":[]},{"level":2,"title":"消息丢失问题","slug":"消息丢失问题","link":"#消息丢失问题","children":[{"level":3,"title":"消息丢失的原因","slug":"消息丢失的原因","link":"#消息丢失的原因","children":[]},{"level":3,"title":"如何让消息不丢失","slug":"如何让消息不丢失","link":"#如何让消息不丢失","children":[]}]},{"level":2,"title":"重复消费问题","slug":"重复消费问题","link":"#重复消费问题","children":[]},{"level":2,"title":"消息的顺序性","slug":"消息的顺序性","link":"#消息的顺序性","children":[]},{"level":2,"title":"分布式事务实现","slug":"分布式事务实现","link":"#分布式事务实现","children":[]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":2.89,"words":868},"filePathRelative":"posts/developer/message_queue_study_records.md","localizedDate":"2022年2月27日","excerpt":"<h2>参考</h2>\\n<ul>\\n<li><a href=\\"https://www.bilibili.com/video/BV1tK411p71q\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">B站视频</a></li>\\n<li><a href=\\"https://note.youdao.com/ynoteshare/index.html?id=8fdbaddd7329d67f1e43b3338f35ceaf&amp;type=note&amp;_time=1644499184108\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">PPT</a></li>\\n<li><a href=\\"https://zhuanlan.zhihu.com/p/60288391\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">参考文章</a></li>\\n</ul>","autoDesc":true}');export{d as comp,c as data};