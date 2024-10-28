---
title: 一篇可供参考的 K8S 落地实践经验
date: 2023-12-26 08:38:00
category:
  - DevOps
tag:
  - devops
  - k8s
---

## 前言

> k8s 即 Kubernetes，是一个开源的容器编排引擎，用来对容器化应用进行自动化部署、 扩缩和管理    
> 本篇文章将分享 k8s v1.18.8 的安装，以及其面板，监控，部署服务，使用Ingress-Ningx进行负载均衡的实践  
> 因为公司用的这个老版本，并且后面要负责搭建，担心无法复刻，趁此周末，实践一二，确认可行，遂与君分享。

## 虚拟机准备

-   宿主机：Windows10
-   虚拟机工具：Hyper-V 10.0.19041.1
-   虚拟机 Linux 系统：CentOS 8.5
-   已安装软件：docker (v2.21.0)及 docker compose(24.0.6)
-   Hyper-V虚拟机一览

![](devops_k8s_install_use/662652-20231224221252676-1766144377.png)

-   IP 及主机名

```
192.168.123.100 master
192.168.123.101 worker01
192.168.123.102 worker02
```

### CentOS8.5 设置固定 IP

-   设置IP及网关：`vi /etc/sysconfig/network-scripts/ifcfg-eth0`

```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
NAME=eth0
DEVICE=eth0
ONBOOT=yes
PREFIX=24
IPV6_PRIVACY=no
# 设置IP及网关
BOOTPROTO=static
IPADDR=192.168.123.100
GATEWAY=192.168.123.1
```

### CentOS8.5 联网检查

-   配置好网络后先测试 curl 是否可以正常访问网络` curl  ``http://mirrors.aliyun.com`，如果提示：` curl: (6) Could not resolve host:  ``mirrors.aliyun.com` ，则需要检查dns设置
-   `cat /etc/resolv.conf` 默认应该是网关的地址，也可以自行修改为其他公共dns

```
nameserver 192.168.123.1
```

### CentOS8.5 设置主机名

-   查看主机信息：`hostnamectl`，通过导入虚拟机创建的主机信息除了mac地址其他基本都一样
-   设置主机名：`hostnamectl set-hostname 主机名`

```
# 查看hostname
hostnamectl --static
#设置 hostname 对应机器设置
# 192.168.123.100
hostnamectl set-hostname master
# 192.168.123.101
hostnamectl set-hostname worker01
# 192.168.123.102
hostnamectl set-hostname worker02
```

### 确保每个节点上 MAC 地址的唯一性

可以在外部使用 PowerShell 查看 Hyper-V 虚拟机的地址，在导入时选择新注册会自动生成 Mac 地址，无需更改

-   centos8.5 查看mac地址：`ip link show dev eth0`

![](devops_k8s_install_use/662652-20231224221252593-915957863.png)

-   外部使用 PowerShell 查看：`(Get-VMNetworkAdapter -VMName "k8s-master").MacAddress`

![](devops_k8s_install_use/662652-20231224221252584-1526366459.png)

### 确保 product_uuid 的唯一性

-   执行 `sudo cat /sys/class/dmi/id/product_uuid` 查看`product_uuid` 我这里因为都是复制的虚拟机，查出来是一样的的，所以需要修改

![](devops_k8s_install_use/662652-20231224221252629-1383913254.png)

-   修改需要关闭虚拟机后执行PowerShell脚本 ，[文章总结](https://www.cnblogs.com/morang/p/hyper-v-uuid-change-powershell-script.html)
-   外部查看Hyper-V虚拟机 UUID

```
Get-VM "k8s-master" | % { (gwmi -Namespace root\virtualization\v2 -Class msvm_computersystem -Filter ('ElementName="{0}"' -f $_.Name)).GetRelated('msvm_virtualsystemsettingdata') | select BIOSGUID }
Get-VM "k8s-worker01" | % { (gwmi -Namespace root\virtualization\v2 -Class msvm_computersystem -Filter ('ElementName="{0}"' -f $_.Name)).GetRelated('msvm_virtualsystemsettingdata') | select BIOSGUID }
Get-VM "k8s-worker02" | % { (gwmi -Namespace root\virtualization\v2 -Class msvm_computersystem -Filter ('ElementName="{0}"' -f $_.Name)).GetRelated('msvm_virtualsystemsettingdata') | select BIOSGUID }
```

-   PowerShell 修改 Hyper-V虚拟机 UUID

```
#这里假设虚拟机的VMname是k8s-master，自行替换即可
$VMname="k8s-master"
$vmx = Get-WmiObject -Namespace root\virtualization\v2 -Class msvm_virtualsystemsettingdata 
#每次操作选择一台虚拟机
$CurrentSettingsData = $vmx | Where-Object { $_.ElementName -eq $VMname }
#检查一下老的GUID
$CurrentSettingsData.BIOSGUID
#生成新GUID
$GUID = [System.Guid]::NewGuid()
#重新写入GUID，注意要带{}，这是非常重要的细节
$CurrentSettingsData.BIOSGUID = "{" + $GUID.Guid.ToUpper() + "}" 
#生成一个ModifySystemSettings的空对象
$VMMS = Get-WmiObject -Namespace root\virtualization\v2 -Class msvm_virtualsystemmanagementservice
$ModifySystemSettingsParams = $VMMS.GetMethodParameters('ModifySystemSettings')
#配置这个属性，需要特殊的转换方式
$ModifySystemSettingsParams.SystemSettings = $CurrentSettingsData.GetText([System.Management.TextFormat]::CimDtd20)
#写入
$VMMS.InvokeMethod('ModifySystemSettings', $ModifySystemSettingsParams, $null)
```

-   开机后查询可以看到已经修改成功

![](devops_k8s_install_use/662652-20231224221252663-882439839.png)

### 确保 Machine ID 的唯一性

-   执行 `/etc/machine-id` 或使用 hostnamectl 发现机器id是一样的

![](devops_k8s_install_use/662652-20231224221252613-1220781311.png)

-   重新生成了机器id

```
sudo cp /etc/machine-id /etc/machine-id.backup
sudo rm /etc/machine-id
sudo systemd-machine-id-setup
cat /etc/machine-id
```

-   执行结果

![](devops_k8s_install_use/662652-20231224221252710-478069305.png)

  


### 检查端口是否被占用

![](devops_k8s_install_use/662652-20231224221252716-805428728.png)

-   centos8.5 使用 ss 查询端口是否使用

```
ss -tuln | grep -E "6443|2379|2380|10250|10259|10257|30000-32767"
```

-   执行结果,无占用

![](devops_k8s_install_use/662652-20231224221252689-2049707927.png)

## 安装 K8S v1.18.8

都2023年了，为什么还是 v1.18.8？

因为公司用的这个版本，并且后面要负责搭建，趁此周末，实践一二，确认可行，遂与君分享。

### 节点初始化

-   **执行主机：** **master** **,worker01,worker02**
-   关闭防火墙
-   关闭swap分区
-   允许 iptables 检查桥接流量
-   添加阿里云 yum 源

```
# 关闭防火墙
systemctl stop firewalld
# 设置永久不开启防火墙
systemctl disable firewalld

# 关闭swap 分区 
swapoff -a   
#永久关闭
sed -ri 's/.*swap.*/#&/' /etc/fstab

# 将 SELinux 设置为 permissive 模式（相当于将其禁用）
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config

# 允许 iptables 检查桥接流量
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# 添加阿里云 yum 源
cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

### 安装kubeadm&kubelet&kubectl

-   **执行主机：** **master** **,worker01,worker02**
-   `kubeadm`：用来初始化集群的指令。
-   `kubelet`：在集群中的每个节点上用来启动 Pod 和容器等。
-   `kubectl`：用来与集群通信的命令行工具。

```
# 安装
yum install -y kubeadm-1.18.8 kubelet-1.18.8 kubectl-1.18.8 ipvsadm
# 自启
sudo systemctl enable --now kubelet
```

-   验证是否安装完成

    -   `kubelet --version`
    -   `kubeadm version`
    -   `kubectl version`

### 安装容器

-   **执行主机：** **master** **,worker01,worker02**

在 Docker 19.x 版本之前，Docker 使用自己的容器运行时（称为 Docker Runtime）。从 Docker 19.x 版本开始，Docker Engine 开始使用 containerd 作为默认的容器运行时，以提供更稳定、可靠的容器管理功能。
- k8s v1.18.8 版本，安装docker v24 暂未遇到问题
-   判断是否启用:`systemctl status containerd`
-   安装docker及container

```
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
rm /etc/yum.repos.d/CentOS-Linux-AppStream.repo -f
rm /etc/yum.repos.d/CentOS-Linux-BaseOS.repo -f
dnf clean all
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce-3:24.0.0-1.el8 docker-ce-cli-1:24.0.6-1.el8 containerd.io docker-buildx-plugin docker-compose-plugin
```

可参考 [Docker V24 及 Docker Compose V2 的安装及使用](https://juejin.cn/post/7283873796977197108)

### 设置节点网络的别名

-   **执行主机：** **master** **,worker01,worker02**

```
cat >> /etc/hosts << EOF
192.168.123.100 master
192.168.123.101 worker01
192.168.123.102 worker02
EOF
```

### 初始化集群

-   **执行主机：** **master**
-   --apiserver-advertise-address：指定通讯节点，使用master节点即可
-   --image-repository：k8s官网镜像库
-   --service-cidr: svc网络的ip段设置
-   --pod-network-cidr:pod的ip段配置，每个pod都会有自己的ip [kube-flannel.yml](https://github.com/flannel-io/flannel/blob/master/Documentation/kube-flannel.yml) 默认 10.244.0.0/16

```
kubeadm init \
  --apiserver-advertise-address=192.168.123.100 \
  --image-repository registry.aliyuncs.com/google_containers \
  --kubernetes-version v1.18.8 \
  --service-cidr=10.10.0.0/16 \
  --pod-network-cidr=10.244.0.0/16 \
  --ignore-preflight-errors=all
```

-   执行结果，创建成功

![](devops_k8s_install_use/662652-20231224221252703-364126435.png)

-   输出结果如下

```
您的Kubernetes控制平面已成功初始化！

要开始使用集群，非root用户需要使用以下操作：

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

您现在应该向集群部署一个pod网络。
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/
  
然后，您可以通过以root身份在每个工作节点上运行以下操作来加入任意数量的工作节点：
kubeadm join 192.168.123.100:6443 --token nn9das.wslckjkd1ng3oxui \
    --discovery-token-ca-cert-hash sha256:7b3f413e6bfbd1f91448460426a144741bd14c2bb3119cfa058d07d65ab329fd
```

-   配置集群身份验证文件

```
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

若不配置直接使用 kubectl 相关命令会提示：` The connection to the server  ``localhost:8080``  was refused - did you specify the right host or port? `

想要在哪里管理k8s 就要将 .kube 文件夹拷贝到目标主机，即工作节点需要复制 .kube 目录到 $HOME 目录中

### 安装网络插件 flannel

-   下载 [kube-flannel.yml](https://github.com/flannel-io/flannel/blob/master/Documentation/kube-flannel.yml)
-   若初始化时指定了 --pod-network-cidr 则需要修改配置中 net-conf.json:Network 项
-   执行安装

```
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml --insecure-skip-tls-verify
```

### worker节点配置

-   **执行主机：worker01,worker02**
-   根据前面的 环境设置，k8s工具安装，docker安装，在worker节点也执行，进行初始化
-   将worker节点加入集群：执行master初始化后输出的join命令

```
kubeadm join 192.168.123.100:6443 --token e270ma.bjeg9k1g3e5k1q2h \
    --discovery-token-ca-cert-hash sha256:7beaa6a51994a7d63544ba1d410504ffe8e58a66746c507d3ff09dd15244a813
```

-   若找不到或失效可通过：`kubeadm token create --print-join-command`重新生成join命令
-   复制 master 节点的k8s配置文件 $HOME/.kube/config 到工作节点
-   安装网络插件 flannel

```
khttps://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml --insecure-skip-tls-verify
```

## 安装 Dashboard v2.0.3

> Kubernetes Dashboard 是一个用于管理和监控 Kubernetes 集群的 Web 用户界面。它提供了一个直观的图形界面，可以帮助你查看和管理集群中的各种资源、部署应用程序、监控集群状态等

-   [官方仓库](https://github.com/kubernetes/dashboard)
-   执行 [recommended.yaml](https://github.com/kubernetes/dashboard/blob/v2.0.4/aio/deploy/recommended.yaml), 安装面板，完全支持的版本为 [v2.0.3](https://github.com/kubernetes/dashboard/releases/tag/v2.0.3)

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.3/aio/deploy/recommended.yaml
```

-   若需要修改token默认15分钟的过期时间为7天，修改对应参数即可

```
args:
- --auto-generate-certificates
- --namespace=kubernetes-dashboard
- --token-ttl=604800
```

-   默认创建的 kubernetes-dashboard 无权限，所以需要授权，这里直接创建使用命令创建一个新用户 admin 并授权
-   创建用户

```
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin
  namespace: kubernetes-dashboard
EOF
```

-   角色授权

```
cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin
  namespace: kubernetes-dashboard
EOF
```

-   获取登陆token

```
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep kubernetes-dashboard| awk '{print $1}')
```

```
[root@master ~]# kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin | awk '{print $1}')
Name:         admin-token-4nqqz
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: admin
              kubernetes.io/service-account.uid: 6f432133-5007-4d8b-9239-8c55efa03826

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  20 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IlUycUl0Zmpnb0Y4Z2FWXzVkbmtjSjR6UngwNW05Z0tDcjVydklLWURYY1EifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi00bnFxeiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjZmNDMyMTMzLTUwMDctNGQ4Yi05MjM5LThjNTVlZmEwMzgyNiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.J8nXyfpWjs9IbnvdfrW5hSq5SkCWy16NL89nphiDk-UGZP0qbcx0xQG_IfmTUfO0lxDQdD84VyZ8EzLENtwtqt3oIVZQyyyUAonOzqnAUfN3l9Jd_uFVbZhS_tfnwC3p4z2htUpDfXNLFoA4hav-2EgT6wY3voIZtnarfNvvBCBCimi-pG4AcCvc34V_udpYRXYpP1IPswS82NMTBVt_T1Y8gm_zKwq8LH6Z4LYr6wdr3MxGT4Fr7H5GK1jVS_wbna06HEK-GI_szNf5u-zRTMP5Si4JOHxnEWwHH4keLG6ez0pwkk5jYTqncczeb91Es_zZE95rvLxn1yh2mzAP5g
```

-   暴露到集群外

```
kubectl patch svc kubernetes-dashboard -n kubernetes-dashboard -p '{"spec":{"type":"NodePort","ports":[{"port":443,"targetPort":8443,"nodePort":30001}]}}'
```

-   使用 Chrome 访问：https://192.168.123.102:30001/#/login

![](devops_k8s_install_use/662652-20231224221252736-435736867.png)

-   因为要求必须要使用https，所以结合之前文章**[前后端都用得上的 Nginx 日常使用经验](https://www.cnblogs.com/morang/p/devops-nginx-install-use.html)**，生成证书并添加域名配置

```
server {

    listen 80;
    listen       443 ssl;
    server_name k8s.devops.test.com;  # 自行修改成你的域名

    ssl_certificate      /certs/k8s.devops.test.com/server.crt;
    ssl_certificate_key  /certs/k8s.devops.test.com/server.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
            proxy_pass https://192.168.123.100:30001;
            proxy_http_version 1.1;
            proxy_buffering off;
            proxy_request_buffering off;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

-   成功使用https+域名访问

![](devops_k8s_install_use/662652-20231224221252709-1081319541.png)

-   升级面板版本 v2.2.0，可以更好的显示 ingress 相关信息

```
# 删除pod
kubectl -n kubernetes-dashboard delete $(kubectl -n kubernetes-dashboard get pod -o name | grep dashboard)
# 重新部署v2.2.0
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml
```

## 安装 Metrics Server v0.3.7

> Metrics Server 是一个用于收集集群中各个组件的资源使用情况和性能指标数据的组件。安装后可以在面板中或使用命令 kubectl top node 查看集群使用情况

-   [官方仓库](https://github.com/kubernetes-sigs/metrics-server)

-   k8s v1.18 对应可以使用 [v0.3.7](https://github.com/kubernetes-sigs/metrics-server/tree/v0.3.7/deploy) 部署文件 metrics-server/deploy/1.8+/

-   修改配置 metrics-server-deployment.yaml

    -   修改镜像源：`registry.aliyuncs.com/google_containers`
    -   新增command配置跳过证书的验证： `-kubelet-insecure-tls`
    -   设置首选通信类型：`--kubelet-preferred-address-types=InternalDNS,InternalIP,ExternalDNS,ExternalIP,Hostname`

```
# ...
spec:
      serviceAccountName: metrics-server
      volumes:
      # mount in tmp so we can safely use from-scratch images and/or read-only containers
      - name: tmp-dir
        emptyDir: {}
      containers:
      - name: metrics-server
        # 修改镜像源 image: k8s.gcr.io/metrics-server/metrics-server:v0.3.7
        image: registry.aliyuncs.com/google_containers/metrics-server:v0.3.7
        imagePullPolicy: IfNotPresent
        # 新增command配置
        command:
        - /metrics-server
        # 跳过 Kubernetes API Server 对 Kubelet TLS 证书的验证
        - --kubelet-insecure-tls
        # 通信时首选的地址类型
        - --kubelet-preferred-address-types=InternalDNS,InternalIP,ExternalDNS,ExternalIP,Hostname
```

-   拷贝文件到服务器或直接在master节点修改
-   到考本文件的目录执行命令安装即可

```
cd /app/k8s/
kubectl apply -f metrics-server-0.3.7/deploy/1.8+/
```

-   目录结构及修改

![](devops_k8s_install_use/662652-20231224221252710-2137788827.png)

-   执行成功

![](devops_k8s_install_use/662652-20231224221252699-1638896453.png)

-   等待pod部署成功后刷新页面可以看到监控就出来了

![](devops_k8s_install_use/662652-20231224221252721-27097896.png)

![](devops_k8s_install_use/662652-20231224221252733-612408733.png)

-   使用 `kubectl top node`查看节点资源使用情况

![](devops_k8s_install_use/662652-20231224221252691-373556356.png)

-   使用 `kubectl top pod -A` 查看 Pod 资源使用情况

## 安装 Helm v3.13.1

> Kubernetes Helm 是一个包管理工具，用于在 Kubernetes 环境中简化应用程序的部署和管理。Helm 允许你定义、安装和升级 Kubernetes 应用程序的预定义软件包，这些软件包称为 Helm Charts。

-   [官方仓库](https://github.com/helm/helm)
-   安装v3版本

```
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash
```

-   安装成功，版本为 v3.13.1

![](devops_k8s_install_use/662652-20231224221252744-1299430260.png)

-   安装目录：/usr/local/bin/helm
-   可以看到有一个警告说没有安装git, 因为 Helm 在安装插件([push插件](https://github.com/chartmuseum/helm-push))时需要使用 Git，所以可以顺手安装一下 git

```
sudo dnf install git -y
```

-   查看Helm仓库列表：`helm repo list` ，默认为空，如果要按照什么应用，需要添加对应的仓库
-   helm 搜索应用：`helm search repo ingress-nginx/ingress-nginx --version='<4'`
-   helm 卸载应用：`helm uninstall -n ingress-nginx ingress-nginx`
-   具体使用可参考下面安装 ingress-nginx
-   在 Helm 中修改镜像源需要使用 `--set` 或 `--set-string` 参数来覆盖默认值。对于 Nginx Ingress Controller，可以通过指定 `controller.image.repository` 和 `controller.image.tag` 来修改镜像源的包地址和版本。这个在安装ingress-nginx就有使用，在无法使用官方镜像的时候一般都需要替换为国内镜像

## 使用 K8S 集群部署服务

### 常用命令

-   部署服务：`kubectl apply -f 配置文件名.yml`
-   查看副本集信息：`kubectl get replicasets`

```
[root@master tests]# kubectl get replicasets
NAME                  DESIRED   CURRENT   READY   AGE
my-nginx-69448bd7d9   2         2         2       36m
```

-   查看 Deployment 信息：`kubectl describe deployments my-nginx`

![](devops_k8s_install_use/662652-20231224221252713-2086538077.png)

-   查看 Service 信息：`kubectl get services my-nginx-service`

```
[root@master tests]# kubectl get services my-nginx-service
NAME               TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
my-nginx-service   NodePort   10.10.143.180   <none>        80:30080/TCP   35m
```

集群中可以使用此服务IP进行通讯

![](devops_k8s_install_use/662652-20231224221252684-2046522162.png)

-   查看部署的 nginx 服务的 Pod :`kubectl get pods --selector=app=my-nginx`

```
[root@master tests]# kubectl get pods --selector=app=my-nginx
NAME                        READY   STATUS    RESTARTS   AGE
my-nginx-69448bd7d9-q8xtl   1/1     Running   0          39m
my-nginx-69448bd7d9-zghxb   1/1     Running   0          30m
```

-   删除服务：`kubectl delete services my-nginx-service`
-   删除负载：`kubectl delete deployment my-nginx`

### 部署一个 nginx 服务

-   配置一个简单的 nginx 服务：nginx.yml
-   部署了 Deployment 和 Service
-   暴露了容器的端口：80
-   暴露集群外的端口：30080
-   设置了2个副本：`replicas: 2`
-   完整配置文件

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-nginx
  template:
    metadata:
      labels:
        app: my-nginx
    spec:
      containers:
        - name: my-nginx
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: my-nginx-service
spec:
  selector:
    app: my-nginx
  type: NodePort
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

-   上传到服务器执行：`kubectl apply -f nginx.yml`
-   部署成功后使用节点IP+端口号即可访问

![](devops_k8s_install_use/662652-20231224221252690-1293840678.png)

-   目前部署了两个服务，但是可以目前没有能够设置负载的地方，所以还需要一个 Ingress 控制器来管理流量和负载均衡

## 使用 Ingress-Nginx v3.41进行服务负载

> Kubernetes 默认使用的负载均衡算法是基于 IP 的轮询（IP-based round-robin），它会将请求按照源 IP 地址的顺序分发到不同的 Pod 上。如果需要其他负载均衡算法，可以使用 Ingress 控制器或者自定义的负载均衡解决方案
>
> 如果使用 Kubernetes 1.19 或更高版本，可以使用最新版本的 NGINX Ingress Controller;
>
> 如果使用旧版本的 Kubernetes（1.18 或更早版本），则必须使用 Ingress-Nginx Controller 的 0.X 版本（例如 0.49 版本

### 准备

-   [官方仓库](https://github.com/kubernetes/ingress-nginx)
-   [版本选择说明](https://kubernetes.github.io/ingress-nginx/deploy/#running-on-kubernetes-versions-older-than-119)
-   ArtifactHub： [v3.41](https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx/3.41.0)
-   使用 helm 查找 ingress-nginx 包

```
# 查询仓库列表
helm repo list
# 添加仓库地址
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
# 搜索包
helm search repo ingress-nginx/ingress-nginx --version='<4'
# ingress-nginx/ingress-nginx     3.41.0          0.51.0          Ingress controller for Kubernetes using NGINX a
```

### 安装

-   创建 namespace

```
kubectl create namespace ingress-nginx
```

-   安装 ingress-nginx 源下的 v3.41 版本 ingress-nginx, 指定 namespace 为 ingress-nginx,指定镜像源为阿里云

```
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --version 3.41.0 --set controller.image.repository=registry.aliyuncs.com/google_containers/nginx-ingress-controller
```

-   如果安装后报错负载无法启动，可能是因为包无法拉取，可指定镜像源 `--set controller.image.repository` 为国内源(registry.aliyuncs.com/google_containers/nginx-ingress-controller) 重新安装（卸载 `helm uninstall -n ingress-nginx ingress-nginx`）即可
-   安装成功，并给出提示应该如何使用

![](devops_k8s_install_use/662652-20231224221252754-1045178623.png)

-   如果需要在局域网中使用，还需要修改两个配置

-   修改负载 ingress-nginx-controller 配置 保存后生效

    -   `dnsPolicy: ClusterFirstWithHostNet` 策略将首先尝试使用主机的 DNS 解析服务来解析域名，如果主机的 DNS 无法解析该域名，将会尝试使用其他配置的 DNS 解析器
    -   `hostNetwork:true` Pod 中的容器将使用主机的网络栈和网络配置

![](devops_k8s_install_use/662652-20231224221252930-72349938.png)

### 使用

-   通过 Dashboard 右上角直接创建 YAML 文件

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-nginx-test
  namespace: default
spec:
  rules:
  - host: nginx.k8stest.com
    http:
      paths:
      - backend:
          serviceName: my-nginx-service
          servicePort: 80
```

-   保存后将会转发域名请求到前面部署的 my-nginx-service 服务中，此时将使用 ingress-nginx 进行负载，当然，还需要将域名解析到目标服务器，本地局域网可以使用 hosts 或者 dns 设置
-   通过 `kubectl describe pod ingress-nginx-controller -n ingress-nginx` 可获取到ingress-nginx所在节点信息，IP为 192.168.123.102

![](devops_k8s_install_use/662652-20231224221252704-1718555845.png)

-   设置 hosts ` 192.168.123.102 nginx.k8stest.com`,再刷新下dns缓存 `ipconfig /flushdns`访问即可，每次刷新都会请求到不同的pod上面

![](devops_k8s_install_use/662652-20231224221252699-424047647.png)

至此，在局域网中安装使用 k8s v1.18.8,并进行相关配置已经完成，得益与大佬们的分享，耗时两天，边弄边记，优化了一些步骤与细节。后续将尝试安装更新的版本，敬请期待。

## 踩坑记录

-   使用yum安装kubeadm时报错，测试发现curl无法使用，错误如下，需要检查设置dns:`cat /etc/resolv.conf` 写入默认配置或公告dns: nameserver 192.168.123.1

```
[root@master ~]# yum install -y kubeadm-1.18.8 kubelet-1.18.8 kubectl-1.18.8 ipvsadm
Repository extras is listed more than once in the configuration
CentOS-8.5.2111 - Base - mirrors.aliyun.com                                                                                                                  0.0  B/s |   0  B     00:00
Errors during downloading metadata for repository 'base':
  - Curl error (6): Couldn't resolve host name for http://mirrors.aliyun.com/centos-vault/8.5.2111/BaseOS/x86_64/os/repodata/repomd.xml [Could not resolve host: mirrors.aliyun.com]
  - Curl error (6): Couldn't resolve host name for http://mirrors.aliyuncs.com/centos-vault/8.5.2111/BaseOS/x86_64/os/repodata/repomd.xml [Could not resolve host: mirrors.aliyuncs.com]
  - Curl error (6): Couldn't resolve host name for http://mirrors.cloud.aliyuncs.com/centos-vault/8.5.2111/BaseOS/x86_64/os/repodata/repomd.xml [Could not resolve host: mirrors.cloud.aliyuncs.com]
Error: Failed to download metadata for repo 'base': Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
```

-   阿里云镜像源的使用，指定镜像源时需要使用 `registry.aliyuncs.com/google_containers/metrics-server:v0.3.7`
-   helm 安装 ingress-nginx 报错，看是否是因为包拉不下来，可以通过指定镜像源重新安装（卸载 `helm uninstall -n ingress-nginx ingress-nginx`）即可：k8s v1.18.8 安装 ingress-nginx:`helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --version 3.41.0 --set controller.image.repository=``registry.aliyuncs.com/google_containers/nginx-ingress-controller`

![](devops_k8s_install_use/662652-20231224221252761-1073116118.png)

## 相关文档

-   官方文档
    -   [k8s官方文档](https://kubernetes.io/zh-cn/docs/setup/)
    -   [在低于 1.19 的 Kubernetes 版本上运行 ingress-nginx的说明](https://kubernetes.github.io/ingress-nginx/deploy/#running-on-kubernetes-versions-older-than-119)
-   参考
    -   [k8s安装与试验](https://qiuyadongsite.github.io/2019/01/03/framework3-microService-k8s1/)
    -   [K8S 1.18.2安装dashboard](https://www.cnblogs.com/binghe001/p/12823763.html)
    -   [Ingress-Nginx部署](https://www.cnblogs.com/hsyw/p/17804493.html)
- 相关推荐
    - [Hyper-V 安装 CentOS 8.5](https://juejin.cn/post/7283798251404738560)
    - [Docker V24 及 Docker Compose V2 的安装及使用](https://juejin.cn/post/7283873796977197108)
    - [前后端都用得上的 Nginx 日常使用经验](https://juejin.cn/post/7296754422750232576)
    
## 后语

> 前前后后尝试了好几次搭建k8s,之前基本都看着这座大山，望而却步，各种理由而终止。当时21立的flag，终于是在这2023的末尾给实现了。
>
> 不积硅步 无以至千里，与君共勉
