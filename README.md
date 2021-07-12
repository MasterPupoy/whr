# Working Human <sub>Resources</sub>
Working Human is a project in progress that aims to be at par with the smart HR systems currently in the market.

This project is built with the intention of following the microservices architecture. All services are deployed using pm2.

                                          ---> applicantService --> mongoDB
                                          |
                                          ---> userService --> mongoDB
                                          |
    client -> nginx -----> API GATEWAY <-->
                                          |
                                          ---> fileService --> mongoDB
                                          |
                                          ---> messaginService --> mongoDB

# Directories
<dl>
  <dt>gateway</dt>
  <dd>A nodejs gateway that acts as an API gateway that proxies all api services and runs on authentication on api requests</dd>
  <dt>applicantService</dt>
  <dd>API service for handling applicants and postings</dd>
  <dt>userService</dt>
  <dd>API service for registration and user logins</dd>
  <dt>fileService</dt>
  <dd>Service for file uploads and downloads</dd>
  <dt>messagingService</dt>
  <dd>Service that handles internal messages and mails</dd>
</dl>