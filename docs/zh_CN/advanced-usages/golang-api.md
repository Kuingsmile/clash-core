---
sidebarTitle: 在 Golang 程序中集成 Clash
sidebarOrder: 3
---

# 在 Golang 程序中集成 Clash

如果 Clash 不能满足您的需求, 您可以在自己的 Golang 代码中使用 Clash.

目前已经有基本的支持:

```go
package main

import (
	"context"
	"fmt"
	"io"
	"net"

	"github.com/Dreamacro/clash/adapter/outbound"
	"github.com/Dreamacro/clash/constant"
	"github.com/Dreamacro/clash/listener/socks"
)

func main() {
	in := make(chan constant.ConnContext, 100)
	defer close(in)

	l, err := socks.New("127.0.0.1:10000", in)
	if err != nil {
		panic(err)
	}
	defer l.Close()

	println("listen at:", l.Address())

	direct := outbound.NewDirect()

	for c := range in {
		conn := c
		metadata := conn.Metadata()
		fmt.Printf("请求从 %s 传入到 %s\n", metadata.SourceAddress(), metadata.RemoteAddress())
		go func () {
			remote, err := direct.DialContext(context.Background(), metadata)
			if err != nil {
				fmt.Printf("Dial 错误: %s\n", err.Error())
				return
			}
			relay(remote, conn.Conn())
		}()
	}
}

func relay(l, r net.Conn) {
	go io.Copy(l, r)
	io.Copy(r, l)
}
```
