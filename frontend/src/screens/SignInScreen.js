const SignInScreen = {
  after_render: () => {},
  render: () => {
    const some = 8;
    return `
    <div class="form-container">
        <form id="signin form">
            <ul class="form-items">
                <li>
                    <h1>Sign-In</h1>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email"/>
                </li>
                <li>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </li>
                <li>
                    <button type="submit" class="primary">Sign In</button>
                </li>
                <li>
                    <div>
                        New user? 
                        <a href="/#/register">Create your account</a>
                    </div>
                </li>
            </ul>
        </form>
    </div>
    `;
  },
};

export default SignInScreen;
