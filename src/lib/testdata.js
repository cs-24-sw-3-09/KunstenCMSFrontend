
export let testDevices = [
    {
        id: 17,
        name: "Skærm Reception Højre",
        location: "Reception",
        model: "Samsung",
        displayOrientation: "Horizontal",
        resolution: "1920x1080",
        connectedState: true,
        fallbackVisualMedia: {
            id: 67,
            name: "Default fallback",
            location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            fileType: "jpg",
            description: "Default billede, som man kan bruge hvis man ikke ved hvad default ellers skal være.",
            lastDateModified: "30/10/2003",
            tags: [
                {
                    id: 8,
                    text: "default"
                },
                {
                    id: 9,
                    text: "image"
                }
            ]
        }
    },
    {
        id: 18,
        name: "Skærm Reception Venstre",
        location: "Reception",
        model: "Samsung",
        displayOrientation: "Horizontal",
        resolution: "1920x1080",
        connectedState: true,
        fallbackVisualMedia: {
            id: 67,
            name: "Default fallback",
            location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
            fileType: "jpg",
            description: "Default billede, som man kan bruge hvis man ikke ved hvad default ellers skal være.",
            lastDateModified: "30/10/2003",
            tags: [
                {
                    id: 8,
                    text: "default"
                },
                {
                    id: 9,
                    text: "image"
                }
            ]
        }
    }
]

export let testUser = {
    id: 1,
    email: "aj@kunsten.dk",
    firstName: "Anne",
    lastName: "Jensen",
    pauseNotificationStart: "2024/11/20",
    pauseNotificationEnd: "2024/11/30",
    notificationState: true,
    mediaPlanner: true,
    admin: true
}

export let testUsers = [
    {
        id: 1,
        email: "aj@kunsten.dk",
        firstName: "Anne",
        lastName: "Jensen",
        pauseNotificationStart: "2024/11/20",
        pauseNotificationEnd: "2024/11/25",
        notificationState: true,
        mediaPlanner: true,
        admin: true
    },
    {
        id: 2,
        email: "la@kunsten.dk",
        firstName: "Lars",
        lastName: "Andersen",
        pauseNotificationStart: "2024/12/01",
        pauseNotificationEnd: "2024/12/10",
        notificationState: false,
        mediaPlanner: false,
        admin: true
    },
    {
        id: 3,
        email: "sc@kunsten.dk",
        firstName: "Sofie",
        lastName: "Christensen",
        pauseNotificationStart: "2024/11/15",
        pauseNotificationEnd: "2024/11/22",
        notificationState: true,
        mediaPlanner: true,
        admin: false
    },
    {
        id: 4,
        email: "eh@kunsten.dk",
        firstName: "email",
        lastName: "Hansen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: true,
        admin: false
    },
    {
        id: 5,
        email: "kp@kunsten.dk",
        firstName: "Kasper",
        lastName: "Pedersen",
        pauseNotificationStart: "2024/10/01",
        pauseNotificationEnd: "2024/10/15",
        notificationState: true,
        mediaPlanner: true,
        admin: false
    },
    {
        id: 6,
        email: "cn@kunsten.dk",
        firstName: "Camilla",
        lastName: "Nielsen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 7,
        email: "ml@kunsten.dk",
        firstName: "Maja",
        lastName: "Larsen",
        pauseNotificationStart: "2024/12/15",
        pauseNotificationEnd: "2025/01/01",
        notificationState: true,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 8,
        email: "am@kunsten.dk",
        firstName: "Anders",
        lastName: "Mortensen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 9,
        email: "so@kunsten.dk",
        firstName: "Sebastian",
        lastName: "Olsen",
        pauseNotificationStart: "2024/11/10",
        pauseNotificationEnd: "2024/11/17",
        notificationState: true,
        mediaPlanner: true,
        admin: false
    },
    {
        id: 10,
        email: "it@kunsten.dk",
        firstName: "Ida",
        lastName: "Thomsen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: true,
        admin: true
    },
    {
        id: 11,
        email: "fr@kunsten.dk",
        firstName: "Frederik",
        lastName: "Rasmussen",
        pauseNotificationStart: "2024/11/28",
        pauseNotificationEnd: "2024/12/05",
        notificationState: true,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 12,
        email: "mk@kunsten.dk",
        firstName: "Maria",
        lastName: "Krogh",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 13,
        email: "ve@kunsten.dk",
        firstName: "Victor",
        lastName: "Eriksen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 14,
        email: "eh@kunsten.dk",
        firstName: "Emma",
        lastName: "Høgh",
        pauseNotificationStart: "2024/10/20",
        pauseNotificationEnd: "2024/10/30",
        notificationState: true,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 15,
        email: "js@kunsten.dk",
        firstName: "Julie",
        lastName: "Svendsen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 16,
        email: "cb@kunsten.dk",
        firstName: "Christian",
        lastName: "Bach",
        pauseNotificationStart: "2024/12/01",
        pauseNotificationEnd: "2024/12/08",
        notificationState: true,
        mediaPlanner: true,
        admin: false
    },
    {
        id: 17,
        email: "ns@kunsten.dk",
        firstName: "Nanna",
        lastName: "Sørensen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 18,
        email: "rb@kunsten.dk",
        firstName: "Rasmus",
        lastName: "Brandt",
        pauseNotificationStart: "2024/11/18",
        pauseNotificationEnd: "2024/11/25",
        notificationState: true,
        mediaPlanner: true,
        admin: false
    },
    {
        id: 19,
        email: "lk@kunsten.dk",
        firstName: "Louise",
        lastName: "Knudsen",
        pauseNotificationStart: null,
        pauseNotificationEnd: null,
        notificationState: false,
        mediaPlanner: false,
        admin: false
    },
    {
        id: 20,
        email: "ab@kunsten.dk",
        firstName: "Alexander",
        lastName: "Bruun",
        pauseNotificationStart: "2024/12/20",
        pauseNotificationEnd: "2025/01/10",
        notificationState: true,
        mediaPlanner: false,
        admin: false
    }
]

export let testVisualMedia = [
    {
        id: 1,
        name: "Sunset Symphony",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A captivating painting capturing the beauty of a sunset over the ocean.",
        lastDateModified: "2023-05-15",
        tags: [
            { id: 1, text: "art" },
            { id: 2, text: "painting" },
            { id: 3, text: "seascape" }
        ],
        status: "available",
    },
    {
        id: 2,
        name: "Eternal Form",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A modern sculpture showcasing the flow and continuity of life.",
        lastDateModified: "2022-11-10",
        tags: [
            { id: 4, text: "art" },
            { id: 5, text: "sculpture" },
            { id: 6, text: "modern" }
        ],
        status: "planned",
    },
    {
        id: 3,
        name: "Captured Horizon",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A serene photograph of rolling hills meeting the sky at dawn.",
        lastDateModified: "2023-03-22",
        tags: [
            { id: 7, text: "art" },
            { id: 8, text: "photography" },
            { id: 9, text: "landscape" }
        ],
        status: "used",
    },
    {
        id: 4,
        name: "Still Life, Vibrant Life",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "An intricate drawing depicting vibrant fruits in a hyperrealistic style.",
        lastDateModified: "2023-07-08",
        tags: [
            { id: 10, text: "art" },
            { id: 11, text: "drawing" },
            { id: 12, text: "realism" }
        ],
        status: "available",
    },
    {
        id: 5,
        name: "Abstract Perception",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "An installation challenging perceptions of space and color.",
        lastDateModified: "2023-09-30",
        tags: [
            { id: 13, text: "art" },
            { id: 14, text: "installation" },
            { id: 15, text: "conceptual" }
        ],
        status: "planned",
    },
    {
        id: 6,
        name: "Echoes of Time",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A painting exploring the interplay between history and memory.",
        lastDateModified: "2023-02-18",
        tags: [
            { id: 16, text: "art" },
            { id: 17, text: "painting" },
            { id: 18, text: "abstract" }
        ],
        status: "used",
    },
    {
        id: 7,
        name: "Light and Shadow",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A black-and-white photograph emphasizing dramatic contrasts.",
        lastDateModified: "2022-12-01",
        tags: [
            { id: 19, text: "art" },
            { id: 20, text: "photography" },
            { id: 21, text: "monochrome" }
        ],
        status: "planned",
    },
    {
        id: 8,
        name: "Kinetic Whirl",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "An installation featuring motion and dynamic light patterns.",
        lastDateModified: "2023-06-20",
        tags: [
            { id: 22, text: "art" },
            { id: 23, text: "installation" },
            { id: 24, text: "kinetic" }
        ],
        status: "available",
    },
    {
        id: 9,
        name: "Urban Canvas",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A mural depicting the vibrant culture of a bustling city.",
        lastDateModified: "2023-08-12",
        tags: [
            { id: 25, text: "art" },
            { id: 26, text: "mural" },
            { id: 27, text: "urban" }
        ],
        status: "planned",
    },
    {
        id: 10,
        name: "Reflections of the Mind",
        location: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        fileType: "jpg",
        description: "A conceptual painting exploring the layers of human thought.",
        lastDateModified: "2023-04-25",
        tags: [
            { id: 28, text: "art" },
            { id: 29, text: "painting" },
            { id: 30, text: "conceptual" }
        ],
        status: "used",
    }
];

export let testScheduleWeek = [
    {
        name: "Recepition Left",
        fields: [
            [
                {
                    title: "Default 2023",
                    color: "schedule-color-blue",
                    startTime: "6:00",
                    endTime: "19:00",
                    size: "schedule-size-3",
                    id: 1,
                },
                {
                    title: "Default 2024",
                    color: "schedule-color-blue",
                    startTime: "6:00",
                    endTime: "19:00",
                    size: "schedule-size-3",
                    id: 1,
                },
            ],
            [
                {
                    title: "Default test",
                    color: "schedule-color-red",
                    startTime: "6:00",
                    endTime: "19:00",
                    size: "schedule-size-3",
                    id: 1,
                },
            ],
            [],
            [],
            [],
            [],
            [],
        ],
    },
    {
        name: "Recepition Right",
        fields: [
            [
                {
                    title: "Default 2023",
                    color: "schedule-color-red",
                    startTime: "6:00",
                    endTime: "19:00",
                    size: "schedule-size-3",
                    id: 1,
                },
                {
                    title: "Default 2024",
                    color: "schedule-color-blue",
                    startTime: "6:00",
                    endTime: "19:00",
                    size: "schedule-size-3",
                    id: 1,
                },
            ],
            [
                {
                    title: "Default test",
                    color: "schedule-color-red",
                    startTime: "6:00",
                    endTime: "19:00",
                    size: "schedule-size-3",
                    id: 1,
                },
            ],
            [],
            [],
            [],
            [],
            [],
        ],
    },
];

export let testScheduleDay = [
    {
        name: "Recepition Left",
        fields: [
            {
                title: "Default 2023",
                color: "rgba(255, 0, 0, 0.6);",
                startTime: "2:00",
                endTime: "7:00",
                size: "schedule-size-3",
            },
            {
                title: "Default 2024",
                color: "rgba(255, 0, 0, 0.6);",
                startTime: "00:00",
                endTime: "20:00",
                size: "schedule-size-3",
            },
            {
                title: "Default 2024",
                color: "rgba(255, 0, 0, 0.6);",
                startTime: "8:00",
                endTime: "20:00",
                size: "schedule-size-3",
            },
            {
                title: "Default 2024",
                color: "rgba(255, 0, 0, 0.6);",
                startTime: "8:00",
                endTime: "20:00",
                size: "schedule-size-3",
            },
        ],
    },
    {
        name: "Recepition Right",
        fields: [
            {
                title: "Default 2023",
                color: "rgba(59, 137, 255, 0.6);",
                startTime: "4:00",
                endTime: "7:00",
                size: "schedule-size-3",
            },
            {
                title: "Default 2024",
                color: "rgba(255, 0, 0, 0.6);",
                startTime: "8:00",
                endTime: "20:00",
                size: "schedule-size-3",
            },
        ],
    },
];

/* 

[
    {
        "device": {
            "id": 9,
            "name": "Important1",
            "location": "Monarch",
            "displayOrientation": "horizontal",
            "resolution": "1920x1080",
            "fallbackContent": {
                "type": "visualMedia",
                "id": 125,
                "name": "lohse.png",
                "location": "/files/visual_media/125.png",
                "fileType": "image/png",
                "description": "testttt",
                "lastDateModified": "2024-12-03T20:38:11.022039"
            },
            "monday_start": null,
            "monday_end": null,
            "tuesday_start": null,
            "tuesday_end": null,
            "wednesday_start": null,
            "wednesday_end": null,
            "thursday_start": null,
            "thursday_end": null,
            "friday_start": null,
            "friday_end": null,
            "saturday_start": null,
            "saturday_end": null,
            "sunday_start": null,
            "sunday_end": null
        },
        "timeslots": [
            {
                "id": 1,
                "name": "testtimeslot",
                "startDate": "2024-12-04",
                "endDate": "2024-12-07",
                "startTime": "08:30:00",
                "endTime": "13:30:00",
                "weekdaysChosen": 63,
                "displayContent": {
                    "type": "visualMedia",
                    "id": 113,
                    "name": "000350170018.jpg123",
                    "location": "/files/visual_media/113.jpg",
                    "fileType": "image/jpeg",
                    "description": "Don del me <--",
                    "lastDateModified": "2024-12-03T20:34:59.410978"
                },
                "displayDevices": [
                    {
                        "id": 9,
                        "name": "Important1",
                        "location": "Monarch",
                        "displayOrientation": "horizontal",
                        "resolution": "1920x1080",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 125,
                            "name": "lohse.png",
                            "location": "/files/visual_media/125.png",
                            "fileType": "image/png",
                            "description": "testttt",
                            "lastDateModified": "2024-12-03T20:38:11.022039"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    },
                    {
                        "id": 10,
                        "name": "test2",
                        "location": "rtest2",
                        "displayOrientation": "horizontal",
                        "resolution": "123x123",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    }
                ]
            },
            {
                "id": 2,
                "name": "testtimeslot2",
                "startDate": "2024-12-02",
                "endDate": "2024-12-06",
                "startTime": "16:00:00",
                "endTime": "10:30:00",
                "weekdaysChosen": 257,
                "displayContent": {
                    "type": "slideshow",
                    "id": 112,
                    "name": "DO NOT",
                    "isArchived": false,
                    "visualMediaInclusionCollection": [
                        {
                            "id": 96,
                            "slideDuration": 50,
                            "slideshowPosition": 5,
                            "visualMedia": {
                                "type": "visualMedia",
                                "id": 115,
                                "name": "Background.png",
                                "location": "/files/visual_media/115.png",
                                "fileType": "image/png",
                                "description": "Dont Delete Me",
                                "lastDateModified": "2024-12-03T20:34:34.17918"
                            }
                        },
                        {
                            "id": 98,
                            "slideDuration": 25,
                            "slideshowPosition": 3,
                            "visualMedia": {
                                "type": "visualMedia",
                                "id": 113,
                                "name": "000350170018.jpg123",
                                "location": "/files/visual_media/113.jpg",
                                "fileType": "image/jpeg",
                                "description": "Don del me <--",
                                "lastDateModified": "2024-12-03T20:34:59.410978"
                            }
                        },
                        {
                            "id": 91,
                            "slideDuration": 20,
                            "slideshowPosition": 1,
                            "visualMedia": {
                                "type": "visualMedia",
                                "id": 114,
                                "name": "Workshop4.pdf - Google Chrome 22-01-2024 10_37_57.png",
                                "location": "/files/visual_media/114.png",
                                "fileType": "image/png",
                                "description": "Dont Delete Me",
                                "lastDateModified": "2024-12-03T20:34:41.85306"
                            }
                        }
                    ]
                },
                "displayDevices": [
                    {
                        "id": 9,
                        "name": "Important1",
                        "location": "Monarch",
                        "displayOrientation": "horizontal",
                        "resolution": "1920x1080",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 125,
                            "name": "lohse.png",
                            "location": "/files/visual_media/125.png",
                            "fileType": "image/png",
                            "description": "testttt",
                            "lastDateModified": "2024-12-03T20:38:11.022039"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    }
                ]
            },
            {
                "id": 3,
                "name": "testtimeslot3",
                "startDate": "2024-11-30",
                "endDate": "2024-12-04",
                "startTime": "08:42:48",
                "endTime": "10:42:44",
                "weekdaysChosen": 257,
                "displayContent": {
                    "type": "visualMedia",
                    "id": 114,
                    "name": "Workshop4.pdf - Google Chrome 22-01-2024 10_37_57.png",
                    "location": "/files/visual_media/114.png",
                    "fileType": "image/png",
                    "description": "Dont Delete Me",
                    "lastDateModified": "2024-12-03T20:34:41.85306"
                },
                "displayDevices": [
                    {
                        "id": 9,
                        "name": "Important1",
                        "location": "Monarch",
                        "displayOrientation": "horizontal",
                        "resolution": "1920x1080",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 125,
                            "name": "lohse.png",
                            "location": "/files/visual_media/125.png",
                            "fileType": "image/png",
                            "description": "testttt",
                            "lastDateModified": "2024-12-03T20:38:11.022039"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    }
                ]
            }
        ],
        "dayfields": [
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                },
                {
                    "color": "color-2",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 2,
                        "name": "testtimeslot2",
                        "startDate": "2024-12-02",
                        "endDate": "2024-12-06",
                        "startTime": "16:00:00",
                        "endTime": "10:30:00",
                        "weekdaysChosen": 257,
                        "displayContent": {
                            "type": "slideshow",
                            "id": 112,
                            "name": "DO NOT",
                            "isArchived": false,
                            "visualMediaInclusionCollection": [
                                {
                                    "id": 96,
                                    "slideDuration": 50,
                                    "slideshowPosition": 5,
                                    "visualMedia": {
                                        "type": "visualMedia",
                                        "id": 115,
                                        "name": "Background.png",
                                        "location": "/files/visual_media/115.png",
                                        "fileType": "image/png",
                                        "description": "Dont Delete Me",
                                        "lastDateModified": "2024-12-03T20:34:34.17918"
                                    }
                                },
                                {
                                    "id": 98,
                                    "slideDuration": 25,
                                    "slideshowPosition": 3,
                                    "visualMedia": {
                                        "type": "visualMedia",
                                        "id": 113,
                                        "name": "000350170018.jpg123",
                                        "location": "/files/visual_media/113.jpg",
                                        "fileType": "image/jpeg",
                                        "description": "Don del me <--",
                                        "lastDateModified": "2024-12-03T20:34:59.410978"
                                    }
                                },
                                {
                                    "id": 91,
                                    "slideDuration": 20,
                                    "slideshowPosition": 1,
                                    "visualMedia": {
                                        "type": "visualMedia",
                                        "id": 114,
                                        "name": "Workshop4.pdf - Google Chrome 22-01-2024 10_37_57.png",
                                        "location": "/files/visual_media/114.png",
                                        "fileType": "image/png",
                                        "description": "Dont Delete Me",
                                        "lastDateModified": "2024-12-03T20:34:41.85306"
                                    }
                                }
                            ]
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                },
                {
                    "color": "color-3",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 3,
                        "name": "testtimeslot3",
                        "startDate": "2024-11-30",
                        "endDate": "2024-12-04",
                        "startTime": "08:42:48",
                        "endTime": "10:42:44",
                        "weekdaysChosen": 257,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 114,
                            "name": "Workshop4.pdf - Google Chrome 22-01-2024 10_37_57.png",
                            "location": "/files/visual_media/114.png",
                            "fileType": "image/png",
                            "description": "Dont Delete Me",
                            "lastDateModified": "2024-12-03T20:34:41.85306"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            []
        ]
    },
    {
        "device": {
            "id": 10,
            "name": "test2",
            "location": "rtest2",
            "displayOrientation": "horizontal",
            "resolution": "123x123",
            "fallbackContent": {
                "type": "visualMedia",
                "id": 113,
                "name": "000350170018.jpg123",
                "location": "/files/visual_media/113.jpg",
                "fileType": "image/jpeg",
                "description": "Don del me <--",
                "lastDateModified": "2024-12-03T20:34:59.410978"
            },
            "monday_start": null,
            "monday_end": null,
            "tuesday_start": null,
            "tuesday_end": null,
            "wednesday_start": null,
            "wednesday_end": null,
            "thursday_start": null,
            "thursday_end": null,
            "friday_start": null,
            "friday_end": null,
            "saturday_start": null,
            "saturday_end": null,
            "sunday_start": null,
            "sunday_end": null
        },
        "timeslots": [
            {
                "id": 1,
                "name": "testtimeslot",
                "startDate": "2024-12-04",
                "endDate": "2024-12-07",
                "startTime": "08:30:00",
                "endTime": "13:30:00",
                "weekdaysChosen": 63,
                "displayContent": {
                    "type": "visualMedia",
                    "id": 113,
                    "name": "000350170018.jpg123",
                    "location": "/files/visual_media/113.jpg",
                    "fileType": "image/jpeg",
                    "description": "Don del me <--",
                    "lastDateModified": "2024-12-03T20:34:59.410978"
                },
                "displayDevices": [
                    {
                        "id": 9,
                        "name": "Important1",
                        "location": "Monarch",
                        "displayOrientation": "horizontal",
                        "resolution": "1920x1080",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 125,
                            "name": "lohse.png",
                            "location": "/files/visual_media/125.png",
                            "fileType": "image/png",
                            "description": "testttt",
                            "lastDateModified": "2024-12-03T20:38:11.022039"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    },
                    {
                        "id": 10,
                        "name": "test2",
                        "location": "rtest2",
                        "displayOrientation": "horizontal",
                        "resolution": "123x123",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    }
                ]
            }
        ],
        "dayfields": [
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            [
                {
                    "color": "color-1",
                    "size": "schedule-size-3",
                    "timeslot": {
                        "id": 1,
                        "name": "testtimeslot",
                        "startDate": "2024-12-04",
                        "endDate": "2024-12-07",
                        "startTime": "08:30:00",
                        "endTime": "13:30:00",
                        "weekdaysChosen": 63,
                        "displayContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "displayDevices": [
                            {
                                "id": 9,
                                "name": "Important1",
                                "location": "Monarch",
                                "displayOrientation": "horizontal",
                                "resolution": "1920x1080",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 125,
                                    "name": "lohse.png",
                                    "location": "/files/visual_media/125.png",
                                    "fileType": "image/png",
                                    "description": "testttt",
                                    "lastDateModified": "2024-12-03T20:38:11.022039"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            },
                            {
                                "id": 10,
                                "name": "test2",
                                "location": "rtest2",
                                "displayOrientation": "horizontal",
                                "resolution": "123x123",
                                "fallbackContent": {
                                    "type": "visualMedia",
                                    "id": 113,
                                    "name": "000350170018.jpg123",
                                    "location": "/files/visual_media/113.jpg",
                                    "fileType": "image/jpeg",
                                    "description": "Don del me <--",
                                    "lastDateModified": "2024-12-03T20:34:59.410978"
                                },
                                "monday_start": null,
                                "monday_end": null,
                                "tuesday_start": null,
                                "tuesday_end": null,
                                "wednesday_start": null,
                                "wednesday_end": null,
                                "thursday_start": null,
                                "thursday_end": null,
                                "friday_start": null,
                                "friday_end": null,
                                "saturday_start": null,
                                "saturday_end": null,
                                "sunday_start": null,
                                "sunday_end": null
                            }
                        ]
                    }
                }
            ],
            []
        ]
    }
]














[
    {
        "device": {
            "id": 9,
            "name": "Important1",
            "location": "Monarch",
            "displayOrientation": "horizontal",
            "resolution": "1920x1080",
            "fallbackContent": {
                "type": "visualMedia",
                "id": 125,
                "name": "lohse.png",
                "location": "/files/visual_media/125.png",
                "fileType": "image/png",
                "description": "testttt",
                "lastDateModified": "2024-12-03T20:38:11.022039"
            },
            "monday_start": null,
            "monday_end": null,
            "tuesday_start": null,
            "tuesday_end": null,
            "wednesday_start": null,
            "wednesday_end": null,
            "thursday_start": null,
            "thursday_end": null,
            "friday_start": null,
            "friday_end": null,
            "saturday_start": null,
            "saturday_end": null,
            "sunday_start": null,
            "sunday_end": null
        },
        "timeslots": [
            {
                "id": 1,
                "name": "testtimeslot",
                "startDate": "2024-12-04",
                "endDate": "2024-12-07",
                "startTime": "08:30:00",
                "endTime": "13:30:00",
                "weekdaysChosen": 63,
                "displayContent": {
                    "type": "visualMedia",
                    "id": 113,
                    "name": "000350170018.jpg123",
                    "location": "/files/visual_media/113.jpg",
                    "fileType": "image/jpeg",
                    "description": "Don del me <--",
                    "lastDateModified": "2024-12-03T20:34:59.410978"
                },
                "displayDevices": [
                    {
                        "id": 10,
                        "name": "test2",
                        "location": "rtest2",
                        "displayOrientation": "horizontal",
                        "resolution": "123x123",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    },
                    {
                        "id": 9,
                        "name": "Important1",
                        "location": "Monarch",
                        "displayOrientation": "horizontal",
                        "resolution": "1920x1080",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 125,
                            "name": "lohse.png",
                            "location": "/files/visual_media/125.png",
                            "fileType": "image/png",
                            "description": "testttt",
                            "lastDateModified": "2024-12-03T20:38:11.022039"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    }
                ]
            }
        ],
        "dayfields": [
            {
                "color": "color-1",
                "size": "schedule-size-3",
                "timeslot": {
                    "id": 1,
                    "name": "testtimeslot",
                    "startDate": "2024-12-04",
                    "endDate": "2024-12-07",
                    "startTime": "08:30:00",
                    "endTime": "13:30:00",
                    "weekdaysChosen": 63,
                    "displayContent": {
                        "type": "visualMedia",
                        "id": 113,
                        "name": "000350170018.jpg123",
                        "location": "/files/visual_media/113.jpg",
                        "fileType": "image/jpeg",
                        "description": "Don del me <--",
                        "lastDateModified": "2024-12-03T20:34:59.410978"
                    },
                    "displayDevices": [
                        {
                            "id": 10,
                            "name": "test2",
                            "location": "rtest2",
                            "displayOrientation": "horizontal",
                            "resolution": "123x123",
                            "fallbackContent": {
                                "type": "visualMedia",
                                "id": 113,
                                "name": "000350170018.jpg123",
                                "location": "/files/visual_media/113.jpg",
                                "fileType": "image/jpeg",
                                "description": "Don del me <--",
                                "lastDateModified": "2024-12-03T20:34:59.410978"
                            },
                            "monday_start": null,
                            "monday_end": null,
                            "tuesday_start": null,
                            "tuesday_end": null,
                            "wednesday_start": null,
                            "wednesday_end": null,
                            "thursday_start": null,
                            "thursday_end": null,
                            "friday_start": null,
                            "friday_end": null,
                            "saturday_start": null,
                            "saturday_end": null,
                            "sunday_start": null,
                            "sunday_end": null
                        },
                        {
                            "id": 9,
                            "name": "Important1",
                            "location": "Monarch",
                            "displayOrientation": "horizontal",
                            "resolution": "1920x1080",
                            "fallbackContent": {
                                "type": "visualMedia",
                                "id": 125,
                                "name": "lohse.png",
                                "location": "/files/visual_media/125.png",
                                "fileType": "image/png",
                                "description": "testttt",
                                "lastDateModified": "2024-12-03T20:38:11.022039"
                            },
                            "monday_start": null,
                            "monday_end": null,
                            "tuesday_start": null,
                            "tuesday_end": null,
                            "wednesday_start": null,
                            "wednesday_end": null,
                            "thursday_start": null,
                            "thursday_end": null,
                            "friday_start": null,
                            "friday_end": null,
                            "saturday_start": null,
                            "saturday_end": null,
                            "sunday_start": null,
                            "sunday_end": null
                        }
                    ]
                }
            }
        ]
    },
    {
        "device": {
            "id": 10,
            "name": "test2",
            "location": "rtest2",
            "displayOrientation": "horizontal",
            "resolution": "123x123",
            "fallbackContent": {
                "type": "visualMedia",
                "id": 113,
                "name": "000350170018.jpg123",
                "location": "/files/visual_media/113.jpg",
                "fileType": "image/jpeg",
                "description": "Don del me <--",
                "lastDateModified": "2024-12-03T20:34:59.410978"
            },
            "monday_start": null,
            "monday_end": null,
            "tuesday_start": null,
            "tuesday_end": null,
            "wednesday_start": null,
            "wednesday_end": null,
            "thursday_start": null,
            "thursday_end": null,
            "friday_start": null,
            "friday_end": null,
            "saturday_start": null,
            "saturday_end": null,
            "sunday_start": null,
            "sunday_end": null
        },
        "timeslots": [
            {
                "id": 1,
                "name": "testtimeslot",
                "startDate": "2024-12-04",
                "endDate": "2024-12-07",
                "startTime": "08:30:00",
                "endTime": "13:30:00",
                "weekdaysChosen": 63,
                "displayContent": {
                    "type": "visualMedia",
                    "id": 113,
                    "name": "000350170018.jpg123",
                    "location": "/files/visual_media/113.jpg",
                    "fileType": "image/jpeg",
                    "description": "Don del me <--",
                    "lastDateModified": "2024-12-03T20:34:59.410978"
                },
                "displayDevices": [
                    {
                        "id": 10,
                        "name": "test2",
                        "location": "rtest2",
                        "displayOrientation": "horizontal",
                        "resolution": "123x123",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 113,
                            "name": "000350170018.jpg123",
                            "location": "/files/visual_media/113.jpg",
                            "fileType": "image/jpeg",
                            "description": "Don del me <--",
                            "lastDateModified": "2024-12-03T20:34:59.410978"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    },
                    {
                        "id": 9,
                        "name": "Important1",
                        "location": "Monarch",
                        "displayOrientation": "horizontal",
                        "resolution": "1920x1080",
                        "fallbackContent": {
                            "type": "visualMedia",
                            "id": 125,
                            "name": "lohse.png",
                            "location": "/files/visual_media/125.png",
                            "fileType": "image/png",
                            "description": "testttt",
                            "lastDateModified": "2024-12-03T20:38:11.022039"
                        },
                        "monday_start": null,
                        "monday_end": null,
                        "tuesday_start": null,
                        "tuesday_end": null,
                        "wednesday_start": null,
                        "wednesday_end": null,
                        "thursday_start": null,
                        "thursday_end": null,
                        "friday_start": null,
                        "friday_end": null,
                        "saturday_start": null,
                        "saturday_end": null,
                        "sunday_start": null,
                        "sunday_end": null
                    }
                ]
            }
        ],
        "dayfields": [
            {
                "color": "color-1",
                "size": "schedule-size-3",
                "timeslot": {
                    "id": 1,
                    "name": "testtimeslot",
                    "startDate": "2024-12-04",
                    "endDate": "2024-12-07",
                    "startTime": "08:30:00",
                    "endTime": "13:30:00",
                    "weekdaysChosen": 63,
                    "displayContent": {
                        "type": "visualMedia",
                        "id": 113,
                        "name": "000350170018.jpg123",
                        "location": "/files/visual_media/113.jpg",
                        "fileType": "image/jpeg",
                        "description": "Don del me <--",
                        "lastDateModified": "2024-12-03T20:34:59.410978"
                    },
                    "displayDevices": [
                        {
                            "id": 10,
                            "name": "test2",
                            "location": "rtest2",
                            "displayOrientation": "horizontal",
                            "resolution": "123x123",
                            "fallbackContent": {
                                "type": "visualMedia",
                                "id": 113,
                                "name": "000350170018.jpg123",
                                "location": "/files/visual_media/113.jpg",
                                "fileType": "image/jpeg",
                                "description": "Don del me <--",
                                "lastDateModified": "2024-12-03T20:34:59.410978"
                            },
                            "monday_start": null,
                            "monday_end": null,
                            "tuesday_start": null,
                            "tuesday_end": null,
                            "wednesday_start": null,
                            "wednesday_end": null,
                            "thursday_start": null,
                            "thursday_end": null,
                            "friday_start": null,
                            "friday_end": null,
                            "saturday_start": null,
                            "saturday_end": null,
                            "sunday_start": null,
                            "sunday_end": null
                        },
                        {
                            "id": 9,
                            "name": "Important1",
                            "location": "Monarch",
                            "displayOrientation": "horizontal",
                            "resolution": "1920x1080",
                            "fallbackContent": {
                                "type": "visualMedia",
                                "id": 125,
                                "name": "lohse.png",
                                "location": "/files/visual_media/125.png",
                                "fileType": "image/png",
                                "description": "testttt",
                                "lastDateModified": "2024-12-03T20:38:11.022039"
                            },
                            "monday_start": null,
                            "monday_end": null,
                            "tuesday_start": null,
                            "tuesday_end": null,
                            "wednesday_start": null,
                            "wednesday_end": null,
                            "thursday_start": null,
                            "thursday_end": null,
                            "friday_start": null,
                            "friday_end": null,
                            "saturday_start": null,
                            "saturday_end": null,
                            "sunday_start": null,
                            "sunday_end": null
                        }
                    ]
                }
            }
        ]
    }
]



*/