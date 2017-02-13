const DummyData = [
    {
        id: 1,
        firstName: 'Bagas',
        lastName: 'Dimas',
        gender: 'M',
        dob: new Date(1990,10,7),
        nationality: 'Indonesia',
        maritalStatus: 'M',
        phone: '1234567890',
        subDivision: 'Java Bootcamp',
        status: 'P',
        suspendDate: new Object,
        hireDate: new Date(2013,10,18),
        grade: 'SE2',
        division: 'CDC1',
        email: 'Bagas.Dimas@mitrais.com',
        office: 'JOG',
        history:[{
            historyStartDate: new Date(2012,12,18),
            historyEndDate: new Date(2013,12,18),
            company: "PT Mitrais",
            position: "Java Developer",
            jobDesc:[
                "adasd",
                "qweqwe",
                "zxcxzc"
            ]
        },
        {
            historyStartDate: new Date(2011,12,18),
            historyEndDate: new Date(2012,12,18),
            company: "PT Abal - Abal",
            position: "Kang Sapu",
            jobDesc:[
                "ihik",
                "uhuhk"
            ]
        }],
        gradeHistory: [{
            ds: 4,
            grade: "SE2",
            startDate: new Date(2013,12,18),
            endDate: new Object
        },
        {
            ds: 5,
            grade: "SE2",
            startDate: new Date(2013,10,18),
            endDate: new Date(2013,12,18)
        }],
        familyMember: [{
            familyName: "Susana Ngatinah",
            familyGender: "F",
            familyDob: new Date(1985,10,18),
            familyType: "W",
            isActive: true
        },
        {
            familyName: "Ngatimin Sutinah",
            familyGender: "F",
            familyDob: new Date(1999,10,18),
            familyType: "D",
            isActive: false
        }],
        location: [{
            officeStartDate: new Date(1999,10,18),
            officeEndDate: null,
            officeLocation: "JOG",
            officeAddress: "Test"
        },
        {
            officeStartDate: new Date(1999,1,18),
            officeEndDate: new Date(1999,10,18),
            officeLocation: "BAL",
            officeAddress: "Yeye yaya"
        },
        {
            officeStartDate: new Date(1998,11,18),
            officeEndDate: new Date(1999,1,18),
            officeLocation: "BAN",
            officeAddress: "OKEEEE"
        }]
    },
    {
        id: 2,
        firstName: 'Test',
        lastName: 'Coba',
        gender: 'F',
        dob: new Date(1990,11,17),
        nationality: 'Indonesia',
        maritalStatus: 'S',
        phone: '1234567890',
        subDivision: '.Net Bootcamp',
        status: 'C',
        suspendDate: new Object,
        hireDate: new Date(2012,10,18),
        grade: 'SQ2',
        division: 'RED',
        email: 'Test.Coba@mitrais.com',
        office: 'Bali',
        history:[],
        gradeHistory: [{
            ds: 5,
            grade: "SE2",
            startDate: new Date(2013,12,18),
            endDate: new Object
        },
        {
            ds: 4,
            grade: "SE2",
            startDate: new Date(2013,10,18),
            endDate: new Date(2013,12,18)
        }],
        familyMember: [],
        location: []
    },
    {
        id: 3,
        firstName: 'Data',
        lastName: 'Dummy',
        gender: 'M',
        dob: new Date(1990,11,27),
        nationality: 'Indonesia',
        maritalStatus: 'S',
        phone: '1234567890',
        subDivision: 'PHP Bootcamp',
        status: 'C',
        suspendDate: new Object,
        hireDate: new Date(2012,10,18),
        grade: 'SM',
        division: 'CDC',
        email: 'Test.Coba@mitrais.com',
        office: 'Bali',
        history:[],
        gradeHistory: [],
        familyMember: [],
        location: []
    },
];

export default DummyData;