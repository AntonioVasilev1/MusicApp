import {register} from '../api/api.js';
import {html} from '../lib.js';

const registerTemplate = (onSubmit) => html`
    <section @submit=${onSubmit} id="registerPage">
        <form>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`


export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPassword = formData.get('conf-pass').trim();

        if (email == '' || password == '' || repeatPassword == '') {
            return alert('All fields are required!')
        }

        if (password != repeatPassword) {
            return alert('Password don\'t match!')
        }

        await register(email, password)
        ctx.page.redirect('/home');
    }
}