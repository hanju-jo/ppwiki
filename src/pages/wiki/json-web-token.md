---
path    : /wiki/json-web-token
title   : JSON Web Token
date    : 2019-05-06 16:42:45
updated : 2019-05-06 17:38:56
toc     : true
public  : true
parent  : 
---

JSON Web Token(`JWT`)은 JSON 기반 개방형 표준([RFC 7519](https://tools.ietf.org/html/rfc7519))으로, 두 관계자 간에 전송되는 클레임(Claim) 을 표현하기 위한 간단하고 URL-safe 한 수단이다. Message Authentication Code(`MAC`) 로 디지털 서명 및 무결성을 보장한다.



JWT는 다른 JSON 기반 표준인 JSON Web Signature(`JWS`)([RFC 7515](https://tools.ietf.org/html/rfc7515)) 와 JSON Web Encryption(`JWE`)([RFC 7516](https://tools.ietf.org/html/rfc7515))에 의존한다.

## 구조

JWT 는 마침표(`.`)을 구분자로 하여 헤더(Header), 페이로드(Payload), 서명(Signature) 으로 이루어져 있다. 각 파트는 base64로 인코딩 되어 있다.

### 헤더(Header)

헤더(또는 JOSE 헤더)는 JWT 클레임 셋을 어떻게 암호화 했는지 명시한다. 아래의 예제는 인코딩된 오브젝트가 JWT 이며, 그 JWT는 HMAC SHA-256 알고리즘을 이용한 JWS임을 나타낸다.

```json
{
    "typ": "JWT",
    "alg": "HS256"
}
```

### 페이로드(Payload)

페이로드는 JWT의 클레임 셋(Claims Set) 을 담고 있다. 클레임 이름(Claim Name)의 종류로는 *Registered*, *Public*, *Private* 세 가지가 있다.

#### 등록된 클레임 이름 (Registered Claim Name)

이 클레임 이름은 [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) 에 등록되어 있다.

-   `iss`: 토큰을 발급한 주체 (Issuer)
-   `sub`: 토큰의 주제(Subject)
-   `aud`: 토큰을 사용할 사람(Audience)
-   `exp`: 토큰 만료 시간 (Expiration Time). 시간은 NumericDate 값이어야 한다.
-   `nbf`: 토큰이 유효해지는 시간. 해당 시간 이전에는 토큰을 수용하지 않아야 한다. (Not Before)
-   `iat`: JWT를 발급한 시간 (Issued At)
-   `jti`: JWT 고유의 식별자(JWT ID)

#### 공개 클레임 이름 (Public Claim Name)

클레임 이름은 JWT를 사용하는 사람들에 의해 마음대로 정의될 수 있다. 그러나 충돌을 막기 위해, 새 클레임 이름은 [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml)에 등록하거나, URI 형식으로 지을 수 있다. 

#### 비공개 클레임 이름 (Private Claim Name)

JWT의 발급자와 사용자간에 협의하여 사용하는 클레임 이름이 비공개 클레임 이름이다. 등록된 클레임 이름 또는 공개 클레임 이름이 아니어야 한다. 이름이 중복되어 충돌이 일어날 수 있으니 사용에 주의해야 한다.

```json
{
	"iss": "joe",
    "exp": 1300819380,
    "http://example.com/is_root": true
}
```

### 서명(Signature)

서명은 도중에 헤더와 페이로드가 위변조 되었는지를 확인하는데 사용된다. 인코딩된 헤더, 인코딩된 페이로드를 `.` 으로 이어 붙이고. 헤더에서 지정한 알고리즘과 비밀키를 이용하여 인코딩하면 서명을 얻을 수 있다.

## 주의점

-   등록된 클레임 이름으로 세 글자를 사용하는 이유는 인코딩 후의 토큰 길이를 최대한 짧게 만들기 위해서다.

-   서명된 토큰의 경우 정보가 위변조로부터 보호되긴 하지만 누구든지 읽을 수 있다는 점에 유의해야 한다. 암호화된 경우가 아니라면, 헤더 또는 페이로드에 보안이 중요한 데이터는 넣지 않는 것이 좋다.

## External Link

- [RFC 7519: JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)
- [jwt.io](https://jwt.io)
