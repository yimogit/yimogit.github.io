import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,e as a,o as s}from"./app-DCEOXUJ9.js";const r="/assets/662652-20170421161534259-1322353205-Ce82gNQ_.png",u="/assets/662652-20170421161915931-257717995-BYvSkW6n.png",l={};function m(o,e){return s(),t("div",null,e[0]||(e[0]=[a('<h1 id="微软消息队列-microsoft-message-queue-msmq" tabindex="-1"><a class="header-anchor" href="#微软消息队列-microsoft-message-queue-msmq"><span>微软消息队列-MicroSoft Message Queue(MSMQ)</span></a></h1><blockquote><p>使用感受：简单。</p></blockquote><h2 id="一、windows安装msmq服务" tabindex="-1"><a class="header-anchor" href="#一、windows安装msmq服务"><span>一、windows安装MSMQ服务</span></a></h2><p>控制面板-&gt;控制面板-&gt;所有控制面板项-&gt;程序和功能-&gt;选中安装</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后可在计算机管理--&gt;服务和应用程序-&gt;消息队列查看队列信息</p><figure><img src="'+u+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="二、c-中使用msmq" tabindex="-1"><a class="header-anchor" href="#二、c-中使用msmq"><span>二、C#中使用MSMQ</span></a></h2><p>使用MessageQueue类操作MSMQ，其在System.Messaging命名空间下，需要添加引用</p><h3 id="定义的接口" tabindex="-1"><a class="header-anchor" href="#定义的接口"><span>定义的接口</span></a></h3><pre><code>public interface IMessageSender&lt;T&gt; : IDisposable

{

    /// &lt;summary&gt;

    ///     发送消息

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;message&quot;&gt;消息对象&lt;/param&gt;

    void SendMessage(T message);



    void SendMessages(List&lt;T&gt; message);



    /// &lt;summary&gt;

    ///     发送消息

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;message&quot;&gt;消息对象&lt;/param&gt;

    /// &lt;param name=&quot;label&quot;&gt;消息标签&lt;/param&gt;

    void SendMessage(T message, string label);

}
</code></pre><h3 id="接口实现" tabindex="-1"><a class="header-anchor" href="#接口实现"><span>接口实现</span></a></h3><pre><code>/// &lt;summary&gt;

///     消息队列对象，由MQueueFactory创建指定路径的队列对象，可发送或批量接收消息。

/// &lt;/summary&gt;

/// &lt;typeparam name=&quot;T&quot;&gt;消息队列存储的消息对象类型&lt;/typeparam&gt;

public sealed class MQueue&lt;T&gt; : IDisposable, IMessageSender&lt;T&gt;, IMessageReceiver&lt;T&gt;

{

    public MQueue(MessageQueue mq, string user = &quot;Everyone&quot;)

    {

        InnerQueue = mq;

        InnerQueue.Formatter = new XmlMessageFormatter(new[] { typeof(T) });



        InnerQueue.SetPermissions(user ?? &quot;Everyone&quot;,

            MessageQueueAccessRights.GenericRead | MessageQueueAccessRights.DeleteMessage |

            MessageQueueAccessRights.DeleteQueue | MessageQueueAccessRights.DeleteJournalMessage);

    }

    #region IMessageSender

    /// &lt;summary&gt;

    ///     内部消息队列对象

    /// &lt;/summary&gt;

    private MessageQueue InnerQueue { get; set; }



    /// &lt;summary&gt;

    ///     发送消息

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;message&quot;&gt;消息对象&lt;/param&gt;

    public void SendMessage(T message)

    {

        InnerQueue.Send(message);

    }



    public void SendMessages(List&lt;T&gt; message)

    {

        foreach (var item in message)

        {

            InnerQueue.Send(item);

        }

    }



    /// &lt;summary&gt;

    ///     发送消息

    /// &lt;/summary&gt;

    /// &lt;param name=&quot;message&quot;&gt;消息对象&lt;/param&gt;

    /// &lt;param name=&quot;label&quot;&gt;消息标签&lt;/param&gt;

    public void SendMessage(T message, string label)

    {

        try

        {

            InnerQueue.Send(message, label);

        }

        catch (Exception ex)

        {

            var path = InnerQueue.Path;

            InnerQueue = new MessageQueue(path);

        }

    }

    #endregion 



    #region IMessageReceiver

    /// &lt;summary&gt;

    /// 获取队列中所有消息

    /// &lt;/summary&gt;

    /// &lt;typeparam name=&quot;T&quot;&gt;消息类型&lt;/typeparam&gt;

    /// &lt;param name=&quot;exTarget&quot;&gt;异常时触发&lt;/param&gt;

    /// &lt;returns&gt;&lt;/returns&gt;

    public List&lt;T&gt; GetAllMessages&lt;T&gt;(MQExceptionTarget exTarget = null)

    {

        return GetMessagesByNum&lt;T&gt;(null, exTarget);

    }

    /// &lt;summary&gt;

    /// 获取队列中指定数量消息

    /// &lt;/summary&gt;

    /// &lt;typeparam name=&quot;T&quot;&gt;消息类型&lt;/typeparam&gt;

    /// &lt;param name=&quot;num&quot;&gt;一次最多取num条数据，默认取所有数据&lt;/param&gt;

    /// &lt;param name=&quot;exTarget&quot;&gt;异常委托&lt;/param&gt;

    /// &lt;returns&gt;&lt;/returns&gt;

    public List&lt;T&gt; GetMessagesByNum&lt;T&gt;(int? num = null, MQExceptionTarget exTarget = null)

    {

        var list = new List&lt;T&gt;();

        if (num.HasValue &amp;&amp; num &lt;= 0)

        {

            return list;

        }

        MessageEnumerator enumerator = InnerQueue.GetMessageEnumerator2();

        while (enumerator.MoveNext())

        {

            Message msg = enumerator.RemoveCurrent();

            enumerator.Reset();

            if (msg != null)

            {

                try

                {

                    list.Add((T)msg.Body);

                    if (num.HasValue &amp;&amp; list.Count &gt;= num)

                    {

                        break;

                    }

                }

                catch (Exception ex)

                {

                    if (exTarget != null)

                        exTarget(ex);

                }

            }

        }

        return list;

    }

    #endregion



    public void Dispose()

    {

        if (InnerQueue != null)

        {

            InnerQueue.Dispose();

        }

    }

}
</code></pre><h3 id="建立队列工厂" tabindex="-1"><a class="header-anchor" href="#建立队列工厂"><span>建立队列工厂</span></a></h3><pre><code>/// &lt;summary&gt;

///  消息队列工厂，通过指定路径创建或获取相应队列对象

/// &lt;/summary&gt;

public class MQueueFactory

{

    /// &lt;summary&gt;

    ///     默认队列路径，在未指定路径的情况下，将创建并返回该路径的消息队列对象

    /// &lt;/summary&gt;

    private const string DefaultPath = @&quot;.\\private$\\myQueue&quot;;



    /// &lt;summary&gt;

    ///     创建默认路径的消息队列对象

    /// &lt;/summary&gt;

    /// &lt;typeparam name=&quot;T&quot;&gt;消息队列存储的消息对象类型&lt;/typeparam&gt;

    /// &lt;returns&gt;&lt;/returns&gt;

    public static MQueue&lt;T&gt; Create&lt;T&gt;()

    {

        return Create&lt;T&gt;(DefaultPath);

    }



    /// &lt;summary&gt;

    ///     创建指定路径的消息队列路径

    /// &lt;/summary&gt;

    /// &lt;typeparam name=&quot;T&quot;&gt;消息队列存储的消息对象类型&lt;/typeparam&gt;

    /// &lt;param name=&quot;connStr&quot;&gt;指定的消息队列链接字符串 def:&quot;.\\private$\\myQueue&quot;&lt;/param&gt;

    /// &lt;param name=&quot;autoCreate&quot;&gt;不存在则创建队列 远程地址不能创建&lt;/param&gt;

    /// &lt;param name=&quot;user&quot;&gt;获得队列额外权限的个人、组或计算机&lt;/param&gt;

    /// &lt;param name=&quot;cacheKey&quot;&gt;web中Cache键值&lt;/param&gt;

    /// &lt;returns&gt;&lt;/returns&gt;

    public static MQueue&lt;T&gt; Create&lt;T&gt;(string connStr=@&quot;.\\private$\\myQueue&quot;, bool autoCreate = false, string user = &quot;Everyone&quot;, string cacheKey = &quot;MQCache&quot;)

    {

        string path = connStr ?? DefaultPath;

        HttpContext httpContext = HttpContext.Current;

        if (autoCreate &amp;&amp; !MessageQueue.Exists(path))

        {

            MessageQueue.Create(path);

        }

        var mq = new MessageQueue(path);

        if (httpContext != null)

        {

            string key = &quot;MQueue&quot; + typeof(T).Name + cacheKey;

            if ((httpContext.Cache[key] == null))

            {

                httpContext.Cache[key] = new MQueue&lt;T&gt;(mq);

            }

            return httpContext.Cache[key] as MQueue&lt;T&gt;;

        }

        return new MQueue&lt;T&gt;(mq,user);

    }

}
</code></pre><h3 id="写入队列" tabindex="-1"><a class="header-anchor" href="#写入队列"><span>写入队列</span></a></h3><p><code>MQueueFactory.Create&lt;string&gt;(@&quot;.\\private$\\myQueue&quot;, autoCreate: true).SendMessage(&quot;我是写入的数据~~~&quot;);</code></p><h3 id="获取消息" tabindex="-1"><a class="header-anchor" href="#获取消息"><span>获取消息</span></a></h3><p><code>MQueueFactory.Create&lt;string&gt;(@&quot;.\\private$\\myQueue&quot;).GetAllMessages&lt;string&gt;();</code></p>`,19)]))}const p=n(l,[["render",m],["__file","mqdemo_msmq.html.vue"]]),c=JSON.parse('{"path":"/posts/developer/mqdemo_msmq.html","title":"MSMQ队列的简单使用","lang":"zh-CN","frontmatter":{"title":"MSMQ队列的简单使用","date":"2017-04-21T23:21:00.000Z","category":["Developer"],"tag":["msmq"],"description":"微软消息队列-MicroSoft Message Queue(MSMQ) 使用感受：简单。 一、windows安装MSMQ服务 控制面板->控制面板->所有控制面板项->程序和功能->选中安装 然后可在计算机管理-->服务和应用程序->消息队列查看队列信息 二、C#中使用MSMQ 使用MessageQueue类操作MSMQ，其在System.Messa...","head":[["meta",{"property":"og:url","content":"https://www.yimo.link/posts/developer/mqdemo_msmq.html"}],["meta",{"property":"og:site_name","content":"易墨网"}],["meta",{"property":"og:title","content":"MSMQ队列的简单使用"}],["meta",{"property":"og:description","content":"微软消息队列-MicroSoft Message Queue(MSMQ) 使用感受：简单。 一、windows安装MSMQ服务 控制面板->控制面板->所有控制面板项->程序和功能->选中安装 然后可在计算机管理-->服务和应用程序->消息队列查看队列信息 二、C#中使用MSMQ 使用MessageQueue类操作MSMQ，其在System.Messa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-28T11:15:42.000Z"}],["meta",{"property":"article:tag","content":"msmq"}],["meta",{"property":"article:published_time","content":"2017-04-21T23:21:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-28T11:15:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MSMQ队列的简单使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-04-21T23:21:00.000Z\\",\\"dateModified\\":\\"2024-10-28T11:15:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"易墨\\",\\"url\\":\\"https://www.yimo.link\\"}]}"]]},"headers":[{"level":2,"title":"一、windows安装MSMQ服务","slug":"一、windows安装msmq服务","link":"#一、windows安装msmq服务","children":[]},{"level":2,"title":"二、C#中使用MSMQ","slug":"二、c-中使用msmq","link":"#二、c-中使用msmq","children":[{"level":3,"title":"定义的接口","slug":"定义的接口","link":"#定义的接口","children":[]},{"level":3,"title":"接口实现","slug":"接口实现","link":"#接口实现","children":[]},{"level":3,"title":"建立队列工厂","slug":"建立队列工厂","link":"#建立队列工厂","children":[]},{"level":3,"title":"写入队列","slug":"写入队列","link":"#写入队列","children":[]},{"level":3,"title":"获取消息","slug":"获取消息","link":"#获取消息","children":[]}]}],"git":{"createdTime":1730114142000,"updatedTime":1730114142000,"contributors":[{"name":"yimo","email":"yimo@wikiglobal.com","commits":1}]},"readingTime":{"minutes":3.02,"words":907},"filePathRelative":"posts/developer/mqdemo_msmq.md","localizedDate":"2017年4月21日","excerpt":"\\n<blockquote>\\n<p>使用感受：简单。</p>\\n</blockquote>\\n<h2>一、windows安装MSMQ服务</h2>\\n<p>控制面板-&gt;控制面板-&gt;所有控制面板项-&gt;程序和功能-&gt;选中安装</p>\\n<figure><figcaption></figcaption></figure>\\n<p>然后可在计算机管理--&gt;服务和应用程序-&gt;消息队列查看队列信息</p>\\n<figure><figcaption></figcaption></figure>\\n<h2>二、C#中使用MSMQ</h2>\\n<p>使用MessageQueue类操作MSMQ，其在System.Messaging命名空间下，需要添加引用</p>","autoDesc":true}');export{p as comp,c as data};
