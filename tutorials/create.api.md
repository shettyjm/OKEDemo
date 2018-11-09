# Creating an API Policy Implementation
This is often referred to as "Creating an API", however there are many components, from design, documentation, the service implementation and the policy implementation.  What we are talking about here is as the API Manager, you will create and define the API.  It is from this point that all of the other activities, such as deployment, publication and promotion, access grants, etc are launched.  Perhaps this is why we often say "Creating an API"   

## Before you begin
1. You have completed the tutorial [Designing an API](design.api.md)

## Creating the API
### Log into API Platform Cloud Service
1. Point your browser to the management portal URL as described in your chosen environment.

> This URL should take the form of `http(s)://<host>:<port>/apiplatform`

1.  Log in as a user that has the *API Manager* role.  

### Create a new API
1. Make sure you are on the *APIs* menu.  You should see *APIs* in the upper left-hand side as well as a *Create API* button on the right-hand side.  If you don't see this, select the menu button on the left and then select *APIs*

1. Click the *Create API* button

1. Provide a name such as _TicketService_ and a version for your API.  You can also provide a description.

> Since you are using a shared environment/account, you should add your initials or some other identifier to the name, such as _TicketServiceRW_.  This will help you quickly locate your API.

Once your API is created, you will see it in the list of APIs.  Go ahead and click on the API name to continue editing it.

#### Select the specification
> Note: If you transfered ownership of your api to *Oracle APIP CS* then you will be able to perform this step, otherwise, you won't see your API in the list.

On the API Specification tab (left-hand side), you can choose your API design that you created in Apiary during the [Designing an API](design.api.md) lab.  


#### Select and configuration implementation policies
On the API Implementation tab (left-hand side), you will be presented with a request and a response pipeline.  Beginning with the request pipeline, you will see an *API Request* and a *Service Request*.  

 - The API Request is the location at which developers who consume your APIs will send their requests. This end-point resides on the gateway on which the API is deployed. You will deploy the API later.
 - The Service Request is the location of the backend service. If all policy conditions are met, this is the location to which the gateway passes the request.

##### Configure the API Request
The API request is the endpoint to which requests for your API are sent.  The full address to which requests are sent consists of the protocol used, the gateway hostname, the API request endpoint, and any private resource paths available for your service. For example: http://<host>:<port>/ticketService_rw/1/tickets

where:
  - http is the protocol over which the gateway receives requests
  - `<host>:<port>` is the hostname and port of the gateway instance this API is deployed to
  - ticketService_rw/1 is the API endpoint you chose (currently this is hard-coded as /the API name/its version).  
  - /tickets is considered the private resource path of the API. Anything beyond the API endpoint is passed to the back-end service.

To configure the API Request:
1. Hover over the API Request policy, and then click Edit.
1. On the Apply Policy Dialog, complete these fields:
  1. Add a comment about the request (_optional_)
  1. Select HTTP from the Protocol list. This is the protocol on which the gateway receives requests for this API.
  1. Enter the _API Endpoint URL_.  For example ticketService/1 (apiName/version).  Since you are using a shared environment, you will need to make your endpoint unique, so add your initials, or your guid (e.g. /ticketService_rw/1)
  1. Once you are finished, click *Apply*

##### Configure the Service Request
The service request is the URL or end-point at which your back-end service receives requests. When a request meets all policy conditions, the gateway routes the request to this URL and calls your service.

The service request URL can point to any of your service’s resources, not just its base URL. This way you can restrict users to access only a subset of your API’s resources.

To configure the service request, first, Hover over the Service Request policy, and then click Edit.

You can either enter the URL directly, or reference an existing service.  If this is your first API, go ahead and just enter the URL directly and you can test your API against the mock service
1. Policy Dialog, choose to enter a URL:
  1. Enter the Apiary Mock Service URL from [Designing an API](design.api.md) in the back-end Service URL field.
  1. Remove the “/tickets” from the mock-service URL so the API can be designed to call multiple end-points such as “/incidents”
1. Leave the Service Account as None
1. If your gateway is behind your corporate firewall, then you will need to make sure that the *Use Gateway Node Proxy* is checked.
1. Click Apply.
1. Click Save Changes.

Now you can deploy your API and test it.  Refer to [Deploying an API](deploy.api.md) for details.

Once you are comfortable with the operation of your API, you can update your API reference to the actual microservice implementation.  To get the implementation endpoint, refer to the [microservice implemenation](https://github.com/nagypeter/eca-draft/blob/master/tutorials/devcs.build.jobs.md#3-deploy-service-v1-to-microservices-platform-and-test) lab and search for curl.  Essentially you will be setting the service invocation to be `http://<GATEWAY_URL>/tickets`.  The reference lab will give you a refresher for obtaining the `<GATEWAY_URL>` value.

Once pointing to the actual service, you can re-deploy and test your API against the live service

###### Referencing a Service
In API Platform, you can also register your services.  This is ideal for cases where you may want to reference a service for multiple APIs, or you have different members handling the back-end services vs. APIs.  By registering your back-end service end-point as a service in API Platform, you can provide API Managers the ability to reference it in an API, yet not see the actual end-point.

You can also attach a service account to the service if you want to provide authenticated access, but not share the actual credentials

If you wanted to use an already created service, you would simply select it from the list of services that are available to you.

If you just creating your first API, just entering in the URL directly is fine.

## Understanding the Request and Response Flow
In this tutorial, you simply configured the request flow.  In the policy definition, you will see *Request* and *Response* head tabs.

Click the Response tab to view a top-down visual representation of the response flow. You will notice the available policies change as well.  The Service and API Response entries cannot be edited.

In the response flow, the service response happens first. The response from the back-end service is always the first entry in the outbound flow. You can place additional policies in this flow. Policies are run in order, with the uppermost policy run first, followed by the next policy, and so on, until the response is sent back to the client.  An example of this is the redaction policy.  You may want to not return part of the result the back-end system provides

The API Response entry is a visual representation of the point in the outbound flow when the response is returned to the client.

## Conclusion
In this tutorial you learned the following:
  * How to create an API in API Platform Cloud Service
  * The difference between the *Request* and *Response* flow

## Learn more
To learn more about creating APIs, visit [Creating an API](http://www.oracle.com/pls/topic/lookup?ctx=en/cloud/paas/api-platform-cloud&id=GUID-B9691D64-FCD2-4A8C-9DA3-8E29CB48E1E2) in our documentation
