We will be using the following traffic management configuration resources in Istio.

 A VirtualService defines the rules that control how requests for a service are routed within an Istio service mesh. 
 A DestinationRule configures the set of policies to be applied to a request after VirtualService routing has occurred. 
 A Gateway configures a load balancer for HTTP/TCP traffic, most commonly operating at the edge of the mesh to enable ingress traffic for an application. 

### Deploy and check the service V1 on Microservices Platform

Deploy the ecadraft sample application (v1), service, destination rule and gateway for the service

    $ kubectl apply -f kubernetes/ecadraft1.yaml
    service/ecadraft created
    deployment.extensions/ecadraft-v1 created
    gateway.networking.istio.io/ecadraft-gateway created
    destinationrule.networking.istio.io/ecadraft created

Set the Istio ingress IP and port

Execute the following command to determine if your Kubernetes cluster is running in an environment that supports external load balancers.

    $ kubectl get svc istio-ingressgateway -n istio-system
      NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)                                                                                                     AGE
      istio-ingressgateway   LoadBalancer   10.21.102.75   129.213.76.31   80:31380/TCP,443:31390/TCP,31400:31400/TCP,15011:30432/TCP,8060:30960/TCP,15030:32120/TCP,15031:30252/TCP   16d

If the EXTERNAL-IP value is set, your environment has an external load balancer that you can use for the ingress gateway. If the EXTERNAL-IP value is <none> (or perpetually <pending>), your environment does not provide an external load balancer for the ingress gateway. In this case, you can access the gateway using the service nodePort.

Determining the ingress IP and ports for a LOAD BALANCER ingress gateway

    $ export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
    $ export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')

Determining the ingress IP and ports for a NODEPORT ingress gateway

    $ export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o 'jsonpath={.items[0].status.hostIP}')
    $ export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http")].nodePort}')

Set GATEWAY_URL

    $ export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT

Define VirtualService for 100% traffic to V1.

    $ kubectl apply -f kubernetes/ecadraft-virtual-service-v1.yaml
    virtualservice.networking.istio.io/ecadraft created

Check 100% traffic showing V1

    $ curl http://$GATEWAY_URL/tickets
    {"_items":[{"customer":"Krajcik Inc","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...
    ...

Please note V1 provides customer name in lowercase except the first capital letter.

### Deploy and check the service V2 on Microservices Platform

Deploy the ecadraft sample application (v2), service, destination rule and gateway for the service

    $ kubectl apply -f kubernetes/ecadraft2.yaml
    service/ecadraft created
    deployment.extensions/ecadraft-v2 created

### Check that service is still being served fully by V1

Check multiple times that 100% traffic showing V1

    $ curl http://$GATEWAY_URL/tickets
    {"_items":[{"customer":"Krajcik Inc","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...
    ...

### Change the Istio rule to define canary deployment and define traffic percentages as 50/50 and check that half of the requests are being served by V1 and half by V2

Define VirtualService for 50% - 50% traffic to V1 & V2. 

    $ kubectl apply -f kubernetes/ecadraft-virtual-service-50-50.yaml
    virtualservice.networking.istio.io/ecadraft configured

Check 50% - 50% V1 & V2 content

    $ curl http://$GATEWAY_URL/tickets
    {"_items":[{"customer":"Krajcik Inc","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...
    ...
    $
    $ curl http://$GATEWAY_URL/tickets
    {"_items":[{"customer":"MONAHAN LLC","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...

Please note the V2 provides customer name in uppercase.

### Change the Istio rule to define canary deployment and define traffic 100% to V2 and check that all requests are being served by V2

Define VirtualService for 100% traffic to V2. 

    $ kubectl apply -f kubernetes/ecadraft-virtual-service-v2.yaml
    virtualservice.networking.istio.io/ecadraft configured

Check 100% traffic showing V2

    $ curl http://$GATEWAY_URL/tickets
    {"_items":[{"customer":"MITCHELL - ROLFSON","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...
    ...
    $
    $ curl http://$GATEWAY_URL/tickets
    {"_items":[{"customer":"MONAHAN LLC","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...

### Clean up

    $ kubectl delete -f kubernetes/ecadraft1.yaml
    service "ecadraft" deleted
    deployment.extensions "ecadraft-v1" deleted
    gateway.networking.istio.io "ecadraft-gateway" deleted
    destinationrule.networking.istio.io "ecadraft" deleted

    $ kubectl delete -f kubernetes/ecadraft2.yaml
    deployment.extensions "ecadraft-v2" deleted

    $ kubectl delete virtualservice ecadraft
    virtualservice.networking.istio.io "ecadraft" deleted
