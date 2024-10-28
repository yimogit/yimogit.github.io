---
title: k8s证书到期处理
date: 2022-04-02 14:09:00
category:
  - Developer
tag:
  - k8s
---

## 证书续期提示
- 当执行`kubectl get nodes`等提示 Unable to connect to the server: x509: certificate has expired or is not yet valid 既为k8s的证书到期的提示
使用kubeadm安装k8s时，默认生成的client certificate的有效期是1年。

## 续期
master节点：xxx.xxx.xxx.xxx

### 检查证书有效期
kubeadm alpha certs check-expiration
或
openssl x509 -in /etc/kubernetes/pki/apiserver.crt -noout -text |grep ' Not '

### 备份证书
cp -rp /etc/kubernetes /etc/kubernetes.bak

### 重新生成证书
kubeadm alpha certs renew all

### 更新用户凭证
cp /etc/kubernetes/admin.conf  ~/.kube/config -f

### 重启kubelet
systemctl restart kubelet

### 重启apiserver，scheduler，controller-manager 容器
docker ps |grep -E 'k8s_kube-apiserver|k8s_kube-controller-manager|k8s_kube-scheduler|k8s_etcd_etcd'|xargs docker restart

### 检测

systemctl status kubelet

kubectl get nodes 

### 其他节点更新配置
scp root@masterIP:/etc/kubernetes/admin.conf /etc/kubernetes/ && cp /etc/kubernetes/admin.conf  ~/.kube/config -f
或者拷贝到其他节点

