import {backendUrl} from './Config';
import { GreeterClient } from "../grpc/helloworld_grpc_web_pb";
import { HelloRequest, HelloReply } from "../grpc/helloworld_pb";

const client = new GreeterClient(backendUrl);

const callback = (after) => {
    const innercallback = (err, res) => {
        if (err){
            return null;
        }
        after(res.toObject().message);
        console.log(res.toObject());
        return res.toObject();
    }
    return innercallback;
}

const getMessage = (name, after) => {
    const request = new HelloRequest();
    request.setName(name);
    return client.sayHello(request, {}, callback(after));
}

export {getMessage};
