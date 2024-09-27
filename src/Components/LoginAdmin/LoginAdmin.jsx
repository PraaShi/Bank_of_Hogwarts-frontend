<div className={styles.container}>
      <h2>Hello Again!</h2>
      <div className={styles.login}>
        <Tabs
          isFitted
          variant="enclosed"
          index={activeTabIndex}
          onChange={handleTabsChange}
          className={styles.tabs}
        >
          <TabList className={styles.tabList}>
            <Tab _selected={{ color: "white", bg: "#11706A  " }}>Customer</Tab>
            <Tab _selected={{ color: "white", bg: "#7397C4" }}>Admin</Tab>
            <Tab _selected={{ color: "white", bg: "#7397C4" }}>Employee</Tab>
          </TabList>
          <TabPanels className={styles.tabPanels}>
            <TabPanel className={styles.tabPanel}>
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
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
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
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>