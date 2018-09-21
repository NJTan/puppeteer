const puppeteer = require('puppeteer');
const url ='https://sso.stu.edu.cn/login;jsessionid=3BF2DE3632351778AFC23F6DD05BAE38.tomcat51?service=https%3A%2F%2Fmy.stu.edu.cn%2Fv3%2F';
const currentUrl='https://my.stu.edu.cn/v3/discussion/index.jsp';
(async() => {const brower = await puppeteer.launch({
         headless:true,
        executablePath:'C:\\Users\\宁静致远\\node_modules\\_puppeteer@1.8.0@puppeteer\\.local-chromium\\win64-588429\\chrome-win32\\chrome.exe'
    });
try {
    const page = await brower.newPage();
    // 开启一个新页面

    // 去mystu那个页面
    console.time();
    await page.goto(url, {
        waitUntil: 'networkidle2'  // 网络空闲说明已加载完毕
    });
    const name = '17njtan';
    await page.type('#username', name);
    const pwd = 'TAN250';
    await page.type('#password', pwd);
    const inputElement = await page.$('input[type=submit]');
    page.on('load', () => console.log('Page loaded!'));
    await inputElement.click();
    await page.waitForNavigation();
    await page.waitFor(200);//防止跳转太快
    console.log(page.url());
    // 结果
    if (page.url() == currentUrl) {
        console.log('登录成功');
    }
    else {
        console.log('登录失败，用户名或密码错误');
    }
}

    catch(error){
        console.log(error);
        console.log('网络未连接或网络异常');
        await brower.close();
    }
    console.timeEnd();
    brower.close();
    console.log('End visit');
// 关闭浏览器
})();