---
path    : /wiki/git-config-core-quotepath
title   : git 한글 파일명 깨지는 문제
date    : 2019-06-07 21:51:59
updated : 2019-06-07 22:14:52
toc     : true
public  : true
parent  : 
---

## 현상
`git status` 명령에서 한글로 된 파일명이 깨지는 문제를 발견했다. (아래 예시의 파일명은 `네이버뉴스.ts` 이다.)

```bash
$ git status
On branch fix-navernews-dateparser
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   "src/impl/\353\204\244\354\235\264\353\262\204\353\211\264\354\212\244.ts"

no changes added to commit (use "git add" and/or "git commit -a")
```

## 해결방법

### 요약

git 설정에서 `core.quotepath` 를 false 로 설정한다.

```bash
$ git config --global core.quotepath false
```

### 설명

[git documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-corequotePath) 에 나와있는 `core.quotepath` 를 *대충* 번역해보면,

>   Commands that output paths (e.g. ls-files, diff), will quote "unusual" characters in the pathname by enclosing the pathname in double-quotes and escaping those characters with backslashes in the same way C escapes control characters (e.g. \t for TAB, \n for LF, \\ for backslash) or bytes with values larger than 0x80 (e.g. octal \302\265 for "micro" in UTF-8). 

경로를 출력하는 명령어 (예: ls-files, diff) 는 경로명에 들어있는 '특이한(unusual)' 글자를 쌍따옴표로 감싼다. 그리고 C에서 제어 문자(예: 탭-`\t`, LF-`\n`, 백슬래쉬-`\\`)를 다룰 때, 또는, `0x80` 보다 큰 값을 갖는 바이트를 백슬래쉬(`\`)를 사용해서 '이스케이프(escape)' 하는 것과 같은 방식으로 특이한 글자를 이스케이프한다.

>   If this variable is set to false, bytes higher than 0x80 are not considered "unusual" any more. Double-quotes, backslash and control characters are always escaped regardless of the setting of this variable.  A simple space character is not considered "unusual".

이 변수를 `false` 로 설정하면 `0x80` 보다 큰 바이트는 더 이상 특이한 것으로 생각하지 않게 된다. 쌍따옴표, 백슬래쉬, 제어 문자는 이 설정과 관계없이 항상 이스케이프한다. 다만, 단순한 공백은 특이한 것으로 간주하지 않는다. 

>    Many commands can output pathnames completely verbatim using the -z option. 

많은 명령어들은 `-z` 옵션을 사용하여 완전한 경로 이름을 얻을 수 있다.

위에서 문제가 발생했던 `git status` 명령을 `-z` 옵션과 함께 사용하면 이렇게 나온다.

```
$ git status -z
M src/impl/네이버뉴스.ts
```

>   The default value is true.

기본 값은 `true` 이다.

## 참고
- [git documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-corequotePath)
