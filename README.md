Read my [blog](https://medium.com/@kasturesushrut/how-to-use-grpc-with-react-450283592188) to follow the tutorial on ReactJS + gRPC!

# Use grpc web with react (simple example)
## Write a .proto file to define the contract for the RPC (This file is already present!)
```
$ cat ./protos/helloworld.proto
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}

```

## Generate js files from this proto

- These files have already been generated for this tutorial, you can skip this step. This steps tells you how to generate js files.
- Make sure the protoc compiler and and grpc-web binary is known to the systems (append the directories containing these binaries to $PATH)
- You can get these compiler binaries from their release repos:
    
    - [protoc](https://github.com/protocolbuffers/protobuf/releases)
    - [protoc-gen-grpc-web](https://github.com/grpc/grpc-web/releases)

(I have put the binaries in the same location!)
```
$ export PATH=/Users/sushrut/Downloads/protoc-3.12.4-osx-x86_64/bin:$PATH
$ which protoc
/Users/sushrut/Downloads/protoc-3.12.4-osx-x86_64/bin/protoc
$ which protoc-gen-grpc-web
/Users/sushrut/Downloads/protoc-3.12.4-osx-x86_64/bin/protoc-gen-grpc-web
```

- Now you can use the script in this repo to compile these files to js files:
```
# ./proto_compiler {DIRECTORY WHERE PROTO FILE LIVES} {PATH TO PROTO FILE TO BE COMPILED}
$ ./proto_compiler.sh protos/ protos/helloworld.proto 
```

- The compiler wrapper script (protoc_compiler.sh) takes care of putting these files in required location.

## Create a gRPC server

- The backend server is written in python and is not in scope of this tutorial. You just have to launch the server using the script as below (make sure you have python3 installed.)

```shell
$ ./grpc-server/start_python_server.sh 
Creating a virtualenv using python3
Created virtualenv
Installing the required libraries
Installed binaries
Staring the backend server
Python backend server started, listening on port 9090!
```

## Create a backend proxy server as a delegator between the gRPC server and gRPC client

- gRPC requires a proxy between a server and client.
- You can start this proxy as 
```shell
$ ./grpc-server/start_proxy.sh 
\nPreparing to download the grpcwebproxy binary to proxy_path/proxy.zip\n
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   659  100   659    0     0    673      0 --:--:-- --:--:-- --:--:--   673
100 7379k  100 7379k    0     0   534k      0  0:00:13  0:00:13 --:--:--  745k
\nExctracting the downloaded binary to proxy_path\n
Archive:  proxy_path/proxy.zip
  inflating: proxy_path/dist/grpcwebproxy-v0.13.0-osx-x86_64  
INFO[0000] parsed scheme: ""                             system=system
INFO[0000] scheme "" not registered, fallback to default scheme  system=system
INFO[0000] ccResolverWrapper: sending update to cc: {[{localhost:9090 0  <nil>}] }  system=system
INFO[0000] ClientConn switching balancer to "pick_first"  system=system
INFO[0000] pickfirstBalancer: HandleSubConnStateChange: 0xc0001867b0, CONNECTING  system=system
INFO[0000] listening for http on: [::]:8080             
```
- If the script above works for you, you should be good with this section and skip next bullets.
- While standard architectures will run the above script, but if it gives an error for your os, download the binary of the grpcwebproxy from [here](https://github.com/improbable-eng/grpc-web/releases)
- Once you have the binary, unzip it and start the proxy server:
```
$ ./grpcwebproxy  --backend_addr=localhost:9090 --backend_tls_noverify --run_tls_server=false --allow_all_origins

INFO[0000] parsed scheme: ""                             system=system
INFO[0000] scheme "" not registered, fallback to default scheme  system=system
INFO[0000] ccResolverWrapper: sending update to cc: {[{localhost:9090 0  <nil>}] }  system=system
INFO[0000] ClientConn switching balancer to "pick_first"  system=system
INFO[0000] pickfirstBalancer: HandleSubConnStateChange: 0xc00011b6e0, CONNECTING  system=system
INFO[0000] listening for http on: [::]:8080
INFO[0000] pickfirstBalancer: HandleSubConnStateChange: 0xc00011b6e0, READY  system=system
```

Now, you are all set up to start serving the react frontend!

## Fire up the front end

- Run npm install to install all dependencies:
```
$ npm install
```
- Run `npm start` or `yarn start`!
```
yarn start
```
- Note:
    
    - the `.env` file tells react two things:
        ```
        SKIP_PREFLIGHT_CHECK=true
        EXTEND_ESLINT=true
        ```
        `SKIP_PREFLIGHT_CHECK`: there is some dependency issue with webpack package, the `grpc-web` downgrades the version.
        
        `EXTEND_ESLINT`: Using this, we direct yarn to ignore the errors in the files mentiond in `eslintConfig` in package.json.
    - The `eslintConfig` contains ignore patterns for the autogenerated .js files
        ```
            "ignorePatterns": [
              "**/*_pb.js"
            ]
        ```
