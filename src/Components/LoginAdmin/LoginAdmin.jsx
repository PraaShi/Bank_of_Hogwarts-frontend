<div className={styles.container}>
      <h2>Hello Again!</h2>
      <div className={styles.login}>
      
              <h2>Sign In</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidation}
                onSubmit={onSubmit}
              >
                <Form className={styles.form}>
                  <FormikControl
                    control="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="filled"
                    fieldStyle={styles.inputField}
                    focusBorderColor="gray.400"
                  />
                  <FormikControl
                    control="input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    variant="filled"
                    fieldStyle={styles.inputField}
                    focusBorderColor="gray.400"
                  />
                  <Button type="submit" className={styles.loginbtn}>
                    Login
                  </Button>
                </Form>
              </Formik>
              <p>
                Not a User? <Link to="/auth/customerRegister">Register</Link>
              </p>
              <h2 style={{ color: "#7397C4" }}>Sign In</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidation}
                onSubmit={onSubmit}
              >
                <Form className={styles.form}>
                  <FormikControl
                    control="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="filled"
                    fieldStyle={styles.inputField}
                    focusBorderColor="gray.400"
                  />
                  <FormikControl
                    control="input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    variant="filled"
                    fieldStyle={styles.inputField}
                    focusBorderColor="gray.400"
                  />
                  <Button type="submit" className={styles.loginbtnblue}>
                    Login
                  </Button>
                </Form>
              </Formik>
           
              <h2 style={{ color: "#7397C4" }}>Sign In</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidation}
                onSubmit={onSubmit}
              >
                <Form className={styles.form}>
                  <FormikControl
                    control="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="filled"
                    fieldStyle={styles.inputField}
                    focusBorderColor="gray.400"
                  />
                  <FormikControl
                    control="input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    variant="filled"
                    fieldStyle={styles.inputField}
                    focusBorderColor="gray.400"
                  />
                  <Button type="submit" className={styles.loginbtnblue}>
                    Login
                  </Button>
                </Form>
              </Formik>
              <p>
                Not a User?{" "}
                <Link to="/auth/employeeRegister" style={{ color: "#7397C4" }}>
                  Register
                </Link>
              </p>
           
      </div>
    </div>