---
path    : /wiki/til-source-zshrc
title   : source .zshrc 실행시 나타나는 npm 버전 문제 해결
date    : 2019-05-15 23:24:03
updated : 2019-05-16 00:34:48
toc     : true
public  : true
parent  : 
---

## 현상

```bash
$ source ~/.zshrc
npm WARN npm npm does not support Node.js v10.8.0
npm WARN npm You should probably upgrade to a newer version of node as we
npm WARN npm can't make any promises that npm will work with this version.
npm WARN npm Supported releases of Node.js are the latest release of 4, 6, 7, 8, 9.
npm WARN npm You can find the latest version at https://nodejs.org/
nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
Run `npm config delete prefix` or `nvm use --delete-prefix v10.8.0 --silent` to unset it.
```

## 해결 방법

npm 버전 확인, npm 제거 모두 실패.

```bash
$ npm -v
env: node: No such file or directory
$ npm uninstall -g npm
env: node: No such file or directory
```

Node.js 를 제거. (글로벌(`-g`)로 설치한 패키지가 모두 날아가니 주의한다.)

```bash
$ curl -ksO https://gist.githubusercontent.com/nicerobot/2697848/raw/uninstall-node.sh
$ chmod +x ./uninstall-node.sh
$ ./uninstall-node.sh
$ rm uninstall-node.sh
```

Node.js 재설치. [nodejs.org](https://nodejs.org/ko/)에서 LTS 버전을 확인 후, 주 버전을 brew로 설치한다. 예를 들어, 현재 LTS 버전이 10.15.3 이라면 `node@10`을 설치.
(여러 버전의 Node.js를 사용해야 한다면 [NVM](https://github.com/nvm-sh/nvm)을 고려해볼 것.)

```bash
$ brew install node@10
$ echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >> ~/.zshrc
$ brew link --force node@10
```

그리고 다시 실행한다.

```bash
$ source .zshrc
```

## 참고
- https://stackoverflow.com/a/43489762
