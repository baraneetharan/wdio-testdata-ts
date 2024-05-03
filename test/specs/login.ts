import { browser } from '@wdio/globals'
import TestData from '../data/testdata.js'
import { User } from '../data/user.js';

let peoples: User[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestData.readUserData(); // Await the Promise to get the actual data
describe("Demo app login", () => {
    for (const people of peoples) {
        it(`valid login  for user ${people.username}`, async () => {
            await browser.maximizeWindow()
            await browser.url('https://the-internet.herokuapp.com/login')
            await $('#username').setValue(people.username)
            await $('button[type="submit"]').click()
            
            const flashElement = await $('#flash');
            await expect(flashElement).toBeDisplayed();
            // await expect(flashElement).toHaveTextContaining(people.expected.trim()); // Deprecated
            await expect(flashElement).toHaveText(expect.stringContaining(people.expected))
        })
    }
})
