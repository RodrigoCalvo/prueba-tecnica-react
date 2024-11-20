function Login({ setter }: { setter: Function }) {
    return (
        <>
            <p>Login</p>
            <button onClick={() => setter(true)}>Click</button>
        </>
    );
}

export default Login;
