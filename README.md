# TakeMeTour's Job Quest 2020 Edition

Thank you for your interest in working at TakeMeTour. First, we would like to take a simple test on your coding skill.

Please fork this repo and work on the test. After finishing the test, please send your repo to benz@takemetour.com (Subject: JavaScript Engineer Application). Or you can simply reply an email that we've send you job quest link.

This quest has 3 parts
- **Basic JavaScript/TypeScript + Algorithm** (Any job position **must** do this part)
- **Front-end** (Only **Front-end** or **Full-stack** position **must** do this part)
- **Back-end** (Only **Back-end** or **Full-stack** position **must** do this part)

**Note:** Some answers can be answer in Thai language.

## Basic JavaScript/TypeScript + Algorithm

We would like to test your basic knowledge on writing JavaScript or TypeScript, plus we also want to test your algorithm skill a little bit.

What you need to do is write the code that solve each question and put it in folder `basic-js-ts`. We will run your code with **Node.js 12**, so check your fancy feature before using it!

**Noted that all questions on this part need to be implemented without using any external library like `lodash`**

1. **Fibonacci Sequence**: Write a function `fib` that return the value of n-th order of fibonacci sequence.

In mathematics, the Fibonacci numbers are the numbers in the following integer sequence, called the Fibonacci sequence, and characterized by the fact that every number after the first two is the sum of the two preceding ones:

```
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
```

**Example**

```javascript
> fib(1)
1

> fib(3)
2

> fib(12)
144
```
answers: src/domain/joke/joke.service.ts private fibonacci(n: number, memo: Map<number, number> = new Map()) // บรรทัดที่ 101  init constructor() บรรทัดที่ 25, 26, 27

2. **Array shift**: Write a function `shift` that shifts the elements of array to left or right by n elements in an infinite loop.

The function receives 3 parameters, 1st is an array, 2nd is the direction ('left' or 'right'), 3rd is the number of elements which will be shifted. For example,

**Example**

```javascript
> shift(['john', 'jane', 'sarah', 'alex'], 'left', 2)
['sarah', 'alex', 'john', 'jane']

> shift([1, 2, 3, 4 ,5], 'right', 3)
[3, 4, 5, 1, 2]
```
answers: src/domain/joke/joke.service.ts private static shift(arr: any[], direction: any, n: any) // บรรทัดที่ 153  init constructor() บรรทัดที่ 36, 37

3. **Second max**: Write a function `secondMax` that receive an array of number. The function will return the second maximum value of the array. If there is no second max, return max instead. If an array is empty, throw and error.

**Example**

```javascript
> secondMax([2, 3, 4, 5])
4

> secondMax([9, 2, 21, 21])
9

> secondMax([4, 4, 4, 4])
4

> secondMax([4123])
4123

> secondMax([])
Error!
```
answers: src/domain/joke/joke.service.ts private static secondMax(arr: any[]) // บรรทัดที่ 130  init constructor() บรรทัดที่ 31, 32, 33, 34, 35

4. **FizzBuzz...But**: You may heard `FizzBuzz` task. Here we have the same rule. You will write a function `fizzBuzz` that receive a single parameter it will return the value base on these rule.

- If the input is divisable by 3, return 'Fizz'
- If the input is divisable by 5, return 'Buzz'
- If the input is divisable by both 3 and 5, return 'FizzBuzz'

**BUT we're not allow you to use `if/else` statement.** If there is any `if` or `else` word in your code. I will consider this question with 0 score :(


**Example**

```javascript
> fizzBuzz(21)
Fizz

> fizzBuzz(25)
Buzz

> fizzBuzz(45)
FizzBuzz
```

answers: src/domain/joke/joke.service.ts private static fizzbuzz(n: number) // บรรทัดที่ 117  init constructor() บรรทัดที่ 28, 29, 30

## Front-End

You are going to make a web application written with **React** which allow users to get some joke from **Chuck Norris**. His joke look like this.

> Chuck Norris once ordered a Big Mac at Burger King, and got one.

### Features
- Users can get a joke from [Chuck Norris API](http://www.icndb.com/api/)
- Users has options to change number of result jokes, user's first name and last name
- How to display the result is up to you.

### Technical description
- Using data from [REST API](http://www.icndb.com/api/)
- Using React to build the apps. (Create React Apps / Pure Webpack setup / Next.js is fine to me)
- We allows you to use any CSS framework. (Or you don't want to use that, also OK to me)

### Bonus
- You can surprise me with any extra features from my requirement. Use your imagination!

### Front-end Questions

1. Explain the what's similar & difference between `cookie` / `localStorage` / `sessionStorage`.

2. Today React have hooks. Do we still need a class component? If your answer is yes then which case that we still need to use class component.

3. Breifly describe how *Virtual DOM* works.

4. Consider this React's components tree

```
Apps > ComponentA > ComponentB > ComponentC > ComponentD > ComponentE
```

If we have a state at `Apps` component, and `ComponentE` component want to access that state value. How do you implements this?

5. What different between using `relative` / `absolute` / `fixed` to position the element.

6. Explain the different between using `callback` / `Promise` / `async await`. When to use and when not to.

## Back-End

You are going to made a simple **Thai's joke API**. And this API is follow to REST API pattern.

Thai's joke API can allow user to explore, add, delete, like or dislike Thai's joke.

### Endpoints
- `GET /` Get all jokes.
- `POST /` Add new joke.
- `GET /:id` Get joke by id.
- `DELETE /:id` Delete joke. (In case you hate it)
- `POST /:id/like` Like a joke. (Because we don't have authentication system yet. Like spaming is fine here.)
- `POST /:id/dislike` Dislike a joke. (Same as above. Dislike spaming is fine here.)

### Technical description
- All data must store to the database. Any database is fine. But we prefer **MongoDB**.
- Back-end code must written in Node.js. Any library or helper tools is up to you (Express / Koa / Nest.js you name it).

### Bonus
- If you implemented simple authentication with username and password, and also allow logged-in user to create or delete the joke. You will get a bonus for this task.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Back-End
```bash
# ใช้ swagger ในการทดลองใช้ API
# endpoint swagger localhost:3000/api
# Setup TEST API 
 1. POST /user/ Add new User. 
 2. PUT /user/:id/activate ** approved user.
 3. GET /login userame password
 4. POST /joke/ Add new joke. (Authentication Add Header 'x-profile': {token})
 5. GET /joke/ Get all jokes. (Authentication Add Header 'x-profile': {token})
 6. GET /joke/:id Get joke by id. (Authentication Add Header 'x-profile': {token})
 7. POST /joke/:id/like Like a joke. (Authentication Add Header 'x-profile': {token})
 8. DELETE /joke/:id Delete joke. (Authentication Add Header 'x-profile': {token})
```

### Back-end Questions

1. Explain First-party cookie & Third-party cookie
   - First-party 
   คุกกี้ของบุคคลที่หนึ่งถูกสร้างขึ้นโดยโดเมนโฮสต์ - โดเมนที่ผู้ใช้กําลังเข้าชม โดยทั่วไปคุกกี้ประเภทนี้ถือว่าดี พวกเขาช่วยให้ประสบการณ์การใช้งานที่ดีขึ้นและเปิดเซสชั่น โดยทั่วไปหมายถึงเบราว์เซอร์สามารถจดจําข้อมูลสําคัญเช่นรายการที่คุณเพิ่มในรถเข็น, ชื่อผู้ใช้และรหัสผ่านของคุณและการตั้งค่าภาษา
   
   - Third-party
   คุกกี้ของบุคคลที่สามคือคุกกี้ที่สร้างโดยโดเมนอื่นนอกเหนือจากที่ผู้ใช้เข้าชมในเวลานั้น และส่วนใหญ่จะใช้สําหรับการติดตามและวัตถุประสงค์ในการโฆษณาออนไลน์ พวกเขายังอนุญาตให้เจ้าของเว็บไซต์ให้บริการบางอย่างเช่นการแชทสด

2. Explain CAP Theorem.
  - Consistency
  ระบบจะกล่าวว่าสอดคล้องถ้าโหนดทั้งหมดเห็นข้อมูลเดียวกันในเวลาเดียวกันเพียงถ้าเราดําเนินการอ่านบนระบบที่สอดคล้องกันก็ควรจะส่งกลับค่าของการดําเนินการเขียนล่าสุด ซึ่งหมายความว่าการอ่านควรทําให้โหนดทั้งหมดเพื่อส่งกลับข้อมูลเดียวกันคือค่าของการเขียนล่าสุด
  
  - Availability
  ความพร้อมใช้งานในระบบแบบกระจายช่วยให้มั่นใจได้ว่าระบบยังคงใช้งานได้ 100% ของเวลา ทุกคําขอได้รับการตอบสนอง (ไม่ใช่ข้อผิดพลาด) โดยไม่คํานึงถึงแต่ละรัฐของโหนด
  
  - Partition Tolerance
  เงื่อนไขนี้ระบุว่า ระบบไม่ล้มเหลว โดยไม่คํานึงถึงว่าข้อความจะถูกลบหรือล่าช้าระหว่างโหนดในระบบความอดทนพาร์ทิชันได้กลายเป็นความจําเป็นมากกว่าตัวเลือกในระบบกระจาย มันเป็นไปได้โดยการจําลองแบบพอระเบียนข้ามการรวมกันของโหนดและเครือข่าย
3. Considering two queries

```javascript
const searchIds = ['1', '2', '3', ...];

const query1 = await Product.find({ id: { $in: searchIds } });

const query2 = await Promise.all(searchIds.map(searchId => Product.find({ id: searchId })));

answers: query2
```

Which one is faster.

4. Explain XSS / SQL Injection / Man in the Middle Attack, and how to prevent each attack type.

5. Explain the different between using `callback` / `Promise` / `async await`. When to use and when not to.

6. Explain how HTTP protocol works.
 แบ่งออกเป็น http Request กับ http Response
 - Request
 http request จะกำหนด action ที่จะกระทำต่อข้อมูล method จะมีลักษณะเป็นตัวพิมพ์ใหญ่ทั้งหมดเสมอ
 โดย method ที่สำคัญมี 4 ตัวคือ GET, POST, PUT, DELETE
 - GET — เป็นการเรียกรับข้อมูลจาก URI ที่กำหนด method GET ควรใช้ในการดึงข้อมูลเท่านั้นและต้องไม่มีผลกระทบใด ๆ กับข้อมูล
 - POST — ใช้สำหรับการสร้างข้อมูลใหม่โดยส่งข้อมูลผ่าน body
 - PUT — ใช้สำหรับแทนที่ข้อมูลที่มีทั้งหมดด้วยข้อมูลใหม่ที่ส่งขึ้นไป
 - DELETE — ใช้สำหรับลบข้อมูลที่มีอยู่ ของเป้าหมายที่กำหนดโดย URI
 
 - Response
 การ Response จะเกิดขึ้นหลังจากส่ง Request ไปที่ server แล้ว server ก็จะมีการตอบรับกลับมาซึ่งเราจะเรียกข้อความที่ตอบกลับมาว่า http-Response message
 http status-code จะแบ่งออกเป็นหมวดหมู่ตามเลขที่อยู่ตัวหน้าสุด และที่ยกมาไว้จะเป็น Response ที่มักจะเจอ โดย Response อื่น ๆ สามารถไปอ่านต่อได้ใน Status Code Definitions
 2xx (สำเร็จ) หมายความว่าการ request นั้นได้รับแล้วและกระทำตาม method สำเร็จโดย Server
 - 200 Ok เป็นมาตรฐานของ HTTP Response นั้น Success สำหรับ GET, PUT หรือ POST
 - 201 Create เป็น Response สำหรับข้อมูลใหม่ได้ถูกสร้างขึ้น ใช้สำหรับ POST
 -204 No Content เป็น Response สำหรับ request ที่ดำเนินการ Success แต่ไม่ได้ return ข้อมูลกลับ
 3xx (Redirection)
 - 304 Not Modified เป็น status code ที่บอกว่า client ได้รับการ Response แล้วอยู่ใน cache และไม่จำเป็นจะต้องส่งผ่านข้อมูลเดิมอีกครั้ง
 4xx (Client error) โดย status ในกลุ่มนี้จะบอก client ว่า request ที่เข้ามา error
 - 400 Bad Request บอกว่า request ที่ส่งมาโดย client นั้นไม่ถูกดำเนินการ และ Server ไม่เข้าใจว่า request เกี่ยวกับอะไร
 - 401 Unauthorized บอกว่า client ไม่ได้รับอนุญาตในการเข้าถึงข้อมูลและควรจะส่ง credential มาพร้อม request
 - 403 Forbidden บ่งบอกว่า request นั้นถูกต้องและ client ได้รับการอนุญาต แต่ Client ไม่ได้รับการอนุญาตให้เข้าถึงข้อมูลด้วยเหตุผลบางประการ
 - 404 Not Found บ่งบอกว่า resource ที่ request มานั้น ไม่ว่างใช้งานตอนนี้
 - 405 Gone บ่งบอกว่าข้อมูลที่ต้องการนั้นไม่มีอยู่แล้ว หรืออาจจะย้ายไปที่อื่น
 5xx (Server error)
 - 500 Internal Server Error บอกว่าการ request นั้นถูกต้อง แต่ server มีความสับสนและจะบริการด้วยเงื่อนไขที่คาดการไม่ได้
 - 503 Service Unavailable บอกว่า server ใช้การไม่ได้ หรือไม่ว่างที่จะรับและดำเนินการ request โดยส่วนใหญ่แล้ว server อยู่ในช่วงบำรุงรักษา

