# How to use Hippotomate
Check [www.hippotomate.com](http://www.hippotomate.com) for a recap of the most important features of Hippotomate.

## Starting
* Download it from [www.hippotomate.com](http://www.hippotomate.com)
* Extract the archive and run `hippotomate.exe` (on Windows) or `hippotomate` on Linux
* Make sure Hippotomate has the correct data to connect to your Selenium server.
* Remember the port Hippotomate will start on (9020)
* Update your Selenium tests to connect to `localhost:9020` instead of `localhost:4444` (or whatever address your Selenium server is)
* Run your tests and they will start appearing in Hippotomate as well.

## Take screenshots during tests
Normally, you'd take the screenshot and save it to a file and view it after your test ends.
If you want to make a lot of screenshots, you'll end up with a lot of files.

However, all you need to do when using Hippotomate is to **JUST** take the screenshot.
Hipotomate will do the rest and will show it to you in its interface.

So, if you use Java, all you need to do is `driver.getScreenshotAs(OutputType.BASE64)`

## Do logging during tests
If you're tired of `System.out.println` or other ways of finding out arbitrary info during the tests, you can now use the following convention so you can log directly in Hippotomate:

`driver.findElementById("--logger;whatever you want to log");`

So, just prefix any of the calls with `--logger;` and you'll get them in the Hippotomate's UI. You'll also need to wrap it into a try/catch block so that your test does not fail.

## Run your tests step by step
If you want to stop the execution, just insert a
`driver.findElementById("--debugger;");`
Then, from Hippotomate's UI, you will be able to run the rest of the test step by step, while having an up to date screenshot of the browser in which you're testing