# Implement API endpoint and complete canary deployment on Microservices using Oracle Developer Cloud Service

## Lab Overview
In this lab you’ll learn how to leverage Oracle Developer Cloud Service to build container packaged application (API endpoint), push to Oracle Cloud Infrastructure Registry finally deploy to Microservices platform using build jobs. The key steps are the following:

1. Create container repository using Oracle Cloud Infrastructure Registry to store container packaged services (V1)
2. Create build job to package service V1 in container and push to container registry
3. Deploy service V1 to Microservices platform and test


## Prerequisites

- [Setup Developer Cloud Service Instance](tutorials/devcs.setup.md)
- [Create OKE cluster](tutorials/setup.oke.md)

### 1. Create container repository using Oracle Cloud Infrastructure Registry to store container packaged services

Open your OCI console and from the left navbar choose Developer Services than select Registry(OCIR).

![](images/ocir/01.oci.console.png)

Click Create Repository.

![](images/ocir/02.create.repository.png)

Fill out the following:
-	Repository Name: eca-demo

IMPORTANT: REPOSITORY NAME MUST FOLLOW THAT NAMING CONVENTION!!!

  For example **eca-c001**
-	Access: Private

Click Submit.

![](images/ocir/03.repository.details.png)

Verify the repository.

![](images/ocir/04.repository.ready.png)

### 2. Create build job to package service V1 in container and push to container registry

Open your DevCS project and from the left navbar choose Build. Click +New Job to create a build job.

![](images/build.jobs/01.build.jobs.png)

Fill out the following:
-	Job Name: build_service_V1
-	Description: build and store service V1
-	Create New: yes
-	Software Template: eca-template

Click Create Job.

![](images/build.jobs/02.build.v1.png)

The build job configuration opens. On the first Source Control tab click Add Source Control and select Git. From the Repository dropdown list select the source code repository for service V1. Check the box to "Automatically perform build on SCM change", this will automate the flow so every time code is changed in your Git repostiory a build will start.

![](images/build.jobs/03.build.v1.git.png)

Change to Builders tab and define the build steps. Add your first step by clicking on Add Builder button. Select Docker Builder than Docker login.

![](images/build.jobs/04.build.v1.docker.login.png)

Fill out the following:
-	Registry Host: iad.ocir.io
-	Username: <tenancy-name>/api.user
-	Password: Auth token (distributed by the instructor on cheat sheet - it is NOT Docker password - look for Auth token)

![](images/build.jobs/05.build.v1.docker.login.details.png)

Click again the Add Builder and select Docker build.

![](images/build.jobs/06.build.v1.docker.build.png)

Fill out the following:
-	Registry Host: iad.ocir.io
-	Image name: <tenancy-name>/eca-demo (what you created above using the format eca-<compartment-name\>)
-	Version Tag: 1.0
- Context Root in Workspace: yes
- Dockerfile: Dockerfile_V1

![](images/build.jobs/07.build.v1.docker.build.details.png)

Click again the Add Builder and select Docker push.

![](images/build.jobs/08.build.v1.docker.push.png)

Fill out the following:
-	Registry Host: iad.ocir.io
-	Image name: <tenancy-name>/eca-demo (what you created above using the format eca-<compartment-name\>)
-	Version Tag: 1.0

![](images/build.jobs/09.build.v1.docker.push.details.png)

Click Save.

![](images/build.jobs/10.build.v1.save.png)

Click on Build now.

![](images/build.jobs/11.build.v1.start.png)

You don't need to wait for the result if there is no available Executor. You can continue with the following step and get back to verify in Registry when the job is completed.

![](images/build.jobs/11.build.v1.verify.png)

### 3. Deploy service V1 to Microservices platform and test

To deploy service V1 to Microservices you will use Build Job again to avoid `kubectl` installation and configuration to your desktop.

But before move to the Build Job creation you need to collect your OCI and OKE instance details to configure `kubectl` which will be executed in the build environment. You need to have the following information:

- User OCID
- Private pair of your API key (provided by instructor)
- Fingerprint of API key (provided by instructor)
- Tenancy OCID
- Cluster OCID

To get these information login to your [OCI tenant](https://console.us-phoenix-1.oraclecloud.com/) as non-federated user (right side) using your credentials. The tenant name also shared by the instructor.

Click on the user icon on the top right corner and select User Settings.

![](images/build.jobs/12.user.settings.png)

Click link Copy next to OCID label in the User Information area to copy User OCID to clipboard. Note the User OCID. At the bottom of the page select and copy Tenancy OCID to your notes.

![](images/build.jobs/13.user.tenancy.ocid.png)

Now get the Cluster OCID. Open OKE console.

![](images/build.jobs/14.cluster.ocid.png)

Select your compartment and click on your cluster.

![](images/build.jobs/14.cluster.details.png)

Click Copy link next to the Cluster Id label on the Cluster Details area. Note your Cluster OCID.

![](images/build.jobs/14.cluster.ocid.copy.png)

Now you have the necessary details to setup OCIcli within build environment. Switch back to your DevCS project to create the next build job.

In your DevCS project from the left navbar choose Build. Click +New Job to create a build job.

![](images/build.jobs/01.build.jobs.png)

Fill out the following:
-	Job Name: deploy_service_V1
-	Description: deploy service V1
-	Create New: yes
-	Software Template: eca-template

Click Create Job.

![](images/build.jobs/15.deploy.v1.create.png)

The build job configuration appears. On the first Source Control tab click Add Source Control and select Git. From the Repository dropdown list select the source code repository for service V1.

![](images/build.jobs/16.deploy.v1.git.png)

Change to Builders tab and define the build steps. Add your first step by clicking on Add Builder button. Select OCIcli Builder.

![](images/build.jobs/17.deploy.v1.builders.ocicli.png)

Fill out the following:
-	User OCID: <user-ocid\> what you find and noted previously
-	Fingerprint: shared by instructor
-	Tenancy: <tenancy-ocid\> what you find and noted previously
-	Private Key: shared by instructor
- Region: US_Ashburn_1 ("us-ashburn-1")

![](images/build.jobs/18.deploy.v1.builders.ocicli.details.b.png)

The builder step above configures the OCIcli tool. In the next step a script (available in the repository) will download the `kubectl` configuration file. Add Unix Shell Builder.

![](images/build.jobs/19.deploy.v1.builders.shell.png)

Copy the following commands to the script text area. Please replace the <cluster-ocid\> parameter to your Cluster OCID.

    mkdir -p $HOME/.kube

    export ENDPOINT="containerengine.us-ashburn-1.oraclecloud.com"

    ./get-kubeconfig.sh <cluster-ocid> > $HOME/.kube/config

    kubectl get nodes

Add another Unix Shell Builder which will execute the service V1 deployment. Copy the following commands into the script area. Don't forget to replace <compartment-name\> and <auth-token\> properly.

    export COMPARTMENT="demo"
    envsubst < kubernetes/ecadraft1.yaml > kubernetes/ecadraft1.final.yaml

    cat kubernetes/ecadraft1.final.yaml

    kubectl create secret docker-registry regcred --docker-server=iad.ocir.io --docker-username=<tenancy-name>/api.user --docker-password=<auth-token> --docker-email=aura@acme.com || echo 'secret exists'

    kubectl apply -f kubernetes/ecadraft1.final.yaml

    sleep 5

    kubectl expose deployment ecadraft-v1 --type=LoadBalancer --name=ecadraft-v1-service
    kubectl get svc

Yous should have similar builders configuration for deploy_service_V1 job:

![](images/build.jobs/20.deploy.v1.builders.details-new.png)

Click Save and execute the deploy_service_V1 build job.

The step above will also print the IP address and port to access through browser. Once the job completed check the log. Click on the log icon to get the build log.

![](images/build.jobs/21.deploy.v1.view.logs.png)

In the log find the output of the "kubectl get svc" command:

![](images/build.jobs/getsvc.png)

It has to be a public IP address and port. When you have this execute the following `curl` command to test the application:

    $ curl -v http://IP:PORT/tickets
    {"_items":[{"customer":"Krajcik Inc","status":"Resolved","product":"Licensed Wooden Salad","_id":"25ccbcc4-a989-4334-a341-fcc18e4efced"...

### Bonus: Define pipelines in Developer Cloud Service

Now that you have two build jobs, one for building and another for deploying the service, you can connect the two into a single flow pipeline. This way you can automate the deployment of new versions whenever a build happens.

1. In Developer Cloud Service, click the build section in the left side menu, and switch to the "Pipelines" tab.
2. Click "New Pipelines" to create a new pipeline and give it a name "DockerFlow"
3. Drag the two jobs into the diagram. Connect them with an arrow so when the build job finishes it auomtatically invokes the deploy job.
4. You can directly run this flow, or set the flow to start auotmatically when one of the jobs starts.

![](/tutorials/DevcsImages/Picture8.png)

