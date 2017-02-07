

export default router = (
    <Router history={hashHistory}>
        <Route path='/employee' component={EmployeeDetails}>
            <IndexRoute component={EmployeeToolbar}/>
                <Route components={EmployeeTab}>
                    <IndexRoute component={EmployeeTabDetails}/>
                    <Route path='/employee/details' components={EmployeeTabDetails} />
                    <Route path='/employee/history' components={EmployeeTabHistory} />
                    <Route path='/employee/grade' components={EmployeeTabGradeHistory} />
                    <Route path='/employee/family' components={EmployeeTabFamilyMember} />
                    <Route path='/employee/address' components={EmployeeTabAddress} />
                    <Route path='/employee/location' components={EmployeeTabLocation} />
                </Route>
        </Route>
    </Router>

)