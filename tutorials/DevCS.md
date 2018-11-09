# Managing Projects with Developer Cloud Service
Release 18.3.3
 
## Lab Overview
In this lab you’ll learn how to leverage Oracle Developer Cloud Service to help  a development team manage their agile development process and automate their DevOps cycle for both software and infrastructure. 

You will be using a shared instance of Developer Cloud Service (DevCS) – to keep from mixing your project with others – please name your project with your short oracle user id.

## Creating a DevCS Project
In this lab you’ll create a DevCS project for your team, and learn about some of the basics tasks of a project administrator.
Key features and functionality:

 -	Managing users
 -	Defining Issue tracking properties
 -	Defining Git Repository


 
### Creating a Project
1.	Using your cloud user – login into your cloud account.
2.	In the my services dashboard locate Developer (if not visible click customize dashboard and make sure developer is in show mode).
3.	Open the service console.
4.	Create a new project – the name of the new project should contain your short Oracle user name (sshmeltz for example)
5.	Choose the following options in the dialog 
 - 	Private project
 -   Initial Repository
 - 	Confluence syntax for your wiki

![](/tutorials/DevcsImages/Picture1.png)
![](/tutorials/DevcsImages/Picture2.png) 

6.	Click Finish to create your project.  Once the project is created you’ll be taken into the project’s home page.
 
![](/tutorials/DevcsImages/Picture3.png)


# Adding a Git Repository
A DevCS Project can have multiple git repositories. We are going to add a new repostiroy copying the content of an existing repository on GitHub.

1. In the left menu choose Administration and then the Repositories section
2. Click to add a New Hosted Repository
3. Name the repostiroy - eca-draft , and choose to import existing repository - use the URL: 
- https://github.com/PrasannaShasthri/eca-draft.git
Click Create.

![](/tutorials/DevcsImages/Picture7.png)

4. In the left menu choose the Code section and you'll see all the code you need for the next labs in your project.
5. You can click on any of the files to see the content and even edit it directly from your browser.
6. From the web interface you can also branch the code when needed.
