ADMIN PAGE BOILERPLATE
=====================
***
Work in progress.  
  
First, add variables from example.env to .env file.  
Then:  
To start **backend** type 'npm run nodemon'  
To start **frontend** type 'npm run watch'  

```diff
-WARNING: Since this boilerplate is in development stage, anyone can create admin account for testing purposes via unsecured request.    
```

Use following request (in Postman, for example) to create admin account:  
url: http://localhost:3000/api/v1/admin/  
method: POST  
body (JSON):  
```json
{
	"userName":"test",
	"role":"admin",
	"email":"admin@gmail.com",
	"password":"test12345678",
	"passwordConfirmation":"test12345678"
}
```  
After authorization you can create other accounts in admin panel.