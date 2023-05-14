# Twitty

Twitty is a Node.js application built using Puppeteer, a headless Chrome Node.js API. This application lets you automatically post tweets from a text file to your Twitter account at random intervals throughout the day. 

## Getting Started

### Prerequisites

1. Node.js installed on your system
2. A Twitter account

### Installation

1. Clone the repository

```bash
git clone https://github.com/<YourUsername>/twitty.git
```

2. Navigate to the project directory

```bash
cd twitty
```

3. Install dependencies

```bash
npm install
```

### Setup
1. Rename config.example.ts to config.ts
2. Fill in your Twitter username and password in config.ts

```typescript
export const TWITTER_USERNAME = 'username';
export const TWITTER_PASSWORD = 'password';
```
3. Add your tweets to tweets.txt, one tweet per line

### Usage
To start the application, run:

```bash
npm run start
```

This will start the Twitty. The application will read the tweets from the tweets.txt file and schedule them to be posted on your Twitter account at random intervals throughout the day.

### How it Works
The TweetScheduler class handles the scheduling of the tweets. It reads tweets from a provided text file and schedules them to be posted at random intervals throughout the day, ensuring a minimum gap of 2 hours between each tweet.

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
MIT

Please note that this project is for educational purposes and should not be used to spam or violate Twitter's terms of service.