This is a test task.
Backend for this App can be found on https://github.com/Alexirius/pwAPI-backend-Node

#PW Application Overview
The application is for Parrot Wings (PW, “internal money”) transfer between system users.
The application is very “polite” and informs a user of any problems (i.e. login not successful, not enough PW to remit the transaction, etc.)

User registration 
Any person on Earth can register with the service for free, providing their Name (e.g. John Smith), valid email (e.g. jsmith@gmail.com) and password. 
When a new user registers, the System verifies that the user has provided a unique (not previously registered in the system) email, and has also provided a human name and a password. These 3 fields are mandatory. Password is to be typed twice for justification. No email verification required.
On successful registration every User will be awarded with 500 (five hundred) PW starting balance.

Logging in
Authorization is performed using JSON Web Token.
Users login to the system using their email and password.
Users are able to Log out.

PW
The system allows users to perform the following operations:
- See their Name and current PW balance always on screen
- Create a new transaction. To make a new transaction (PW payment) a user will
  - Choose the recipient by querying the  User list by name (autocomplete). 
  - When a recipient is chosen, entering the PW transaction amount. The system will check that the transaction amount is not greater than the current user balance.
  - Committing a transaction. Once the transaction succeeds, the recipient account will be credited (PW++) by the entered amount of PW, and the payee account debited (PW--) for the same amount of PW. The system shall display PW balance changes immediately to the user.
- Review a list (history) of their transactions. A list of transactions shows the most recent transactions on top of the list and display the following info for each transaction:
  - Date/Time of the transaction
  - Correspondent Name
  - Transaction amount, (Debit/Credit  for PW transferred)
  - Resulting balance
- Filter sort transaction list by date, correspondent name and amount. 

