# iGarageSale
This is an express ecommerce app where one person's used stuff can be sold and become another's new treasure.

## MVP
A web app that allows users to sell items like they would with a garage sale.

## Stretch Goals
* allow people to make an offer above or below the purchase price
* allow price to move over time
* encrypt password with bcrypt pre putting it in the db

##Technology Stack
* nodejs = backend javascript
* express = nodejs web framework
* ejs = html templating
* mongoDB = nosql database
* elasticsearch = search (stretch)
* jquery = simplify DOM manipuation
* stripe = payment api
* postman

## Inspiration
* amazon.com
* eBay.com
* udemy: https://www.udemy.com/course/build-an-amazon-clone
    * NOTE: this course does a good job of breaking down get, post, put and delete
    * NOTE: also, breaks down building an app into good bite-sized chunks
    * NOTE: the bcrypt process used in the course helped me make my app more secure
      * i.e., in the course, we explicitly encrypt data pre-sending it to the db;
        i'm still unsure if we did that in the fruits auth example

## Challenges
* By far the greatest challenge was converting code written in the Amazon clone course from
  ES5 to ES6 so it worked as expected. It required hours of reading documentation on mongoose, mongo, and other packages used.

* I quickly realized I lacked a firm understanding of CRUD and WHY things were 
  connected as they were in our fruits app. To resolve this, I reviewied classes and
  took the 8-hr udemy course mentioned above.

* My project is ambitious as I aim to create a store with enough functionality
  for me and others to sell unwanted items like a neighborhood garage sale. I had to
  rewrite my pseudocode several times and break things down into small chunks.

* Encrypting the password before it is stored in the database is not working as outlined
  in the course. Perhaps it must be added to the controller not the model as we do in
  the class example. But, that has proven to be insecure locally.

## Wins
* I understand that CRUD translates to: post = create, get = read, put = update, 
  delete = delete.



### Action Items
[x] set up github

[x] set up heroku

[x] live "hello world"

[x] 1st git push

[x] 1st heroku push

[x] .idea added to .gitignore

[ ] 2nd git push

[ ] 2nd heroku push

##SPECIAL THANKS
* Matt = general guidance
* Evan = add secret to Heroku settings
* Malik = willingness to help resolve ES5-ES6 conversion issue

