const puppeteer = require('puppeteer');
const url ='http://credit.stu.edu.cn/portal/stulogin.aspx';
const currentUrl='http://credit.stu.edu.cn/portal/STUMainPage.aspx';
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
        await page.type('#txtUserID', name);
        const pwd = 'TAN250j';
        await page.type('#txtUserPwd', pwd);
        const inputElement = await page.$('input[type=submit]');
        page.on('load', () => console.log(' page load! 弹出对话框'));
        await inputElement.click();
       // await page.waitForNavigation();无头的时候登录错误需要注释这一句，登录成功需要撤销这一句
        await page.waitFor(200);
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
        console.log('网络未连接或网络异常或连接的不是校园网');
        await brower.close();
    }
    console.timeEnd();
    brower.close();
    console.log('End visit');
// 关闭浏览器
})();