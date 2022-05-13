import React from "react"

export const GeneralItem = [
    {
        question: "What is PiggyBank?",
        answer: "PiggyBank is a Bank Management System Web Application created in 2022. It is aimed to provide a bank usage experience to users."
    },
    {
        question: "Who is behind PiggyBank?",
        answer: "PiggyBank is designed and created by Rudy Yen."
    },
    {
        question: "What service do PiggyBank offers?",
        answer: "PiggyBank provides all basic banking functions, which include but are not limited to Transaction, Withdrawl, and Deposit. Other than that, PiggyBank also offers featured functions like Loans and Insurance."
    },
    {
        question: "What currency does PiggyBank accept?",
        answer: "PiggyBank will use HKD as all base calculation and function."
    },
    {
        question: "How does PiggyBank work?",
        answer: "PiggyBank does not invovle any real value since it only used as education demo."
    },
    {
        question: "What data/information do PiggyBank collect?",
        answer: "PiggyBank would collect the Email address and Password (hashed) of users for the login function. All account information (balance, loan status, etc.) will also be stored for related calculations."
    }
];

export const AccountItem = [
    {
        question: "What is PiggyBank Account?",
        answer: "PiggyBank Account is an account used to perform all your banking actions. For example, Transaction."
    },
    {
        question: "How can I create my PiggyBank Account?",
        answer: "Users can register their PiggyBank Account by clicking \"Don't have an account?\" on the Login page."
    },
    {
        question: "Is my password secured?",
        answer: "All passwords of PiggyBank Account are hashed by strong one-way hashing function."
    },
    {
        question: "What is PiggyBank Account Number?",
        answer: "PiggyBank Account Number is a unique number for identifying users' accounts."
    },
    {
        question: "Where can I find my PiggyBank Account information?",
        answer: "The information of PiggyBank Account can be checked in Profile page."
    },
    {
        question: "How can I terminate my PiggyBank Account?",
        answer: "PiggyBank Account can be terminated in Profile page."
    }
]

export const TransactionItem = [
    {
        question: "How can I perform Transaction, and what do I need?",
        answer: "Transaction can be performed in Account Operation in Profile page."
    },
    {
        question: "Can I cancel a Transaction?",
        answer: "Users can not cancel any  performed Transaction."
    },
    {
        question: "How much is the charge of all Transaction?",
        answer: "PiggyBank will not charge any handling free for all amounts of transactions."
    },
    {
        question: "Where can I check my Transaction History?",
        answer: "Users can check their Transaction History in the Profile page."
    },
    {
        question: "Why do I recieve a Error when I make a Transaction?",
        answer: "Please make sure your account has enough balance and enter a valid account number of the payee."
    },
    {
        question: "How can I perform cross bank or platform Transaction?",
        answer: "Users can not perform any non-local Transaction as PiggyBank does not contain any real-world actions."
    }
];

export const SecurityItem = [
    {
        question: "Is my data safe?",
        answer: "Password hashing is implemented in our database, to ensure the security of user's sensitive data."
    },
    {
        question: "How can I secure my account?",
        answer: "You should enable our \"Two Factor Authenication (2FA)\" function, and not to disclose your password to any parties."
    },
    {
        question: "How can I enable my Two Factor Authentication (2FA)?",
        answer: "User can enable their 2FA in the section \" Security \" on Profile page."
    },
    {
        question: "I forgot my account password, what should I do?",
        answer: "You should use our \"Forgot Password\" function in Login page, to reset your password."
    } 
];

export const DevelopmentItem = [
    {
        question: "What technologies are used in PiggyBank?",
        answer: "ReactJS, CSS, NodeJS, Express, and MySQL are the major technologies and frameworks used in PiggyBank."
    },
    {
        question: "What highlighted libraries are used during the development?",
        answer: "Axios, JWT Token, Bcrypt, NodeMailer, React-AOS, CORS."
    },
    {
        question: "What is the architecture of PiggyBank?",
        answer: "It will be the seperation of FrontEnd Server and Backend Application Server."
    },
    {
        question: "What is the architecture in Frontend?",
        answer: "The Frontend architecture is a Component Hierarchy by component usage provided by ReactJS."
    },
    {
        question: "What is the architecture in BackEnd?",
        answer: "The Backend architecture is a MVC-like architecture which handle request and response as CRUD(Create, Read, Update, Delete) Operations."
    },
    {
        question: "What is the API communication between Frontend and Backend?",
        answer: "RESTful API is used as the API communication by different defined endpoints."
    }
    ];
    
