### New Developer Cloud Service Setup ###

Oracle Developer Cloud Service leverages integration with Oracle Cloud Infrastructure Compute Classic and Oracle Cloud Infrastructure Object Storage Classic to provide you with dedicated build servers.

You can create virtual machines (VMs) on Oracle Cloud Infrastructure Compute Classic and use them to run builds of your projects. The archived build artifacts and Maven artifacts are stored on the containers of Oracle Cloud Infrastructure Object Storage Classic.

After sign in, if Oracle Developer Cloud Service isn't listed on the dashboard, click **Customize Dashboard.** Under **Platform,** find **developer _id_,** click **Show,** and then close the **Customize Dashboard** window.

![](images/devcs.setup/noDevCS.png)

If you see two DevCS services, choose 2nd, and then you can close Dialog window.
![](images/devcs.setup/custDashboard.png)

Now go to DevCS instance, on the My Services Dashboard page, in the **developer _id_** tile, click **Action** and select **View Details**
![](images/devcs.setup/DevCS-details.png)

On the upper right corner, click on Open Service Console.
![](images/devcs.setup/DevCS-open-console.png)

If this is first time you access DevCS than you will have to create instance, click on create instance button:
![](images/devcs.setup/DevCS-create-inst.png)

Only parameter you should define is an instance name, click Next and Confirm:
![](images/devcs.setup/DevCS-inst-name.png)

After few minutes instance will be ready and you can access to DevCS.
![](images/devcs.setup/DevCS-access.png)


In order to projects becomes fully functional, you have to configure Compute, Storage and create Build VM. Here are four steps for DevCS setup (all details are on the links, here are just specifics for our lab):

1. [Configure a connection to Oracle Cloud Infrastructure Storage Classic](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/developer/config_compute_storage/devcs_config_storage.html)

In order to collect information needed for Storage setup go to Storage Classic instance and View Details
![](images/devcs.setup/SrorageClassic-view-details.png)

Here you can find related Storage information:
![](images/devcs.setup/DevCS-StorageClassic-connect.png)

Here you configure Storage connection:
![](images/devcs.setup/DevCS-StorageClassic-config.png)


2. [Configure a connection to Oracle Cloud Infrastructure Compute Classic](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/developer/config_compute_storage/devcs_config_compute.html)

In order to collect Compute information, go to Compute Classic instance and View Details where you can find related Compute information:
![](images/devcs.setup/DevCS-ComputeClassic-view-details.png)

Here you configure Compute connection:
![](images/devcs.setup/DevcCS-ComputeClassic-config.png)


3. [Create a Build VM template](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/developer/config_buildvm/devcs_create_buildvmtemplate.html)

- Name: myLabTemplate
- Platform: Oracle Linux 7
- Software (make sure to check the check box for "show latest versions only": Include OCIcli, Kubectl, Docker 1 and Node.js 8 (Base images includes Git, Java, JUnit, Maven, Ruby and Ant.)
![](images/devcs.setup/DevCS-Build-software2.png)


4. [Add Build VMs](http://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/developer/config_buildvm/devcs_create_buildvm.html)

Quantity: 1
VM Template: myLabTempate


You are ready to create new project and start your DevOps process.
