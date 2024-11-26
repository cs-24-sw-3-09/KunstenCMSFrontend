
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

export let testDevices = [
    {
        id: 17,
        name: "Skærm Reception Højre",
        location: "Reception",
        model: "Samsung",
        displayOrientation: "Horizontal",
        resolution: null,
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
        resolution: null,
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
        name: "Sunset Symphony",
        description: "A captivating painting capturing the beauty of a sunset over the ocean.",
        tags: ["art", "painting", "seascape"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-05-15",
        slideshows: ["Gallery Opening 2024", "Seascapes 2023", "Art Fair 2022"],
        status: "available",
    },
    {
        name: "Eternal Form",
        description: "A modern sculpture showcasing the flow and continuity of life.",
        tags: ["art", "sculpture", "modern"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2022-11-10",
        slideshows: ["Sculpture Expo 2024", "Modern Art Week 2023"],
        status: "planned",
    },
    {
        name: "Captured Horizon",
        description: "A serene photograph of rolling hills meeting the sky at dawn.",
        tags: ["art", "photography", "landscape"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-03-22",
        slideshows: ["Photography Contest 2024", "Landscape Series 2023"],
        status: "used",
    },
    {
        name: "Still Life, Vibrant Life",
        description: "An intricate drawing depicting vibrant fruits in a hyperrealistic style.",
        tags: ["art", "drawing", "realism"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-07-08",
        slideshows: ["Realism Showcase 2024", "Still Life Expo 2023"],
        status: "used",
    },
    {
        name: "Abstract Perception",
        description: "An installation challenging perceptions of space and color.",
        tags: ["art", "installation", "conceptual"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-09-30",
        slideshows: ["Conceptual Art 2024", "Avant-Garde 2023"],
        status: "planned",
    },
    {
        name: "Echoes of Time",
        description: "A painting exploring the interplay between history and memory.",
        tags: ["art", "painting", "abstract"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-02-18",
        slideshows: ["Abstract Horizons 2024", "Art Retrospective 2023"],
        status: "used",
    },
    {
        name: "Light and Shadow",
        description: "A black-and-white photograph emphasizing dramatic contrasts.",
        tags: ["art", "photography", "monochrome"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2022-12-01",
        slideshows: ["Monochrome Marvels 2024", "Art of Contrast 2023"],
        status: "available",
    },
    {
        name: "Kinetic Whirl",
        description: "An installation featuring motion and dynamic light patterns.",
        tags: ["art", "installation", "kinetic"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-06-20",
        slideshows: ["Interactive Art 2024", "Kinetic Forms 2023"],
        status: "available",
    },
    {
        name: "Urban Canvas",
        description: "A mural depicting the vibrant culture of a bustling city.",
        tags: ["art", "mural", "urban"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-08-12",
        slideshows: ["Street Art 2024", "Urban Chronicles 2023"],
        status: "planned",
    },
    {
        name: "Reflections of the Mind",
        description: "A conceptual painting exploring the layers of human thought.",
        tags: ["art", "painting", "conceptual"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Faust_bei_der_Arbeit.JPG/1280px-Faust_bei_der_Arbeit.JPG",
        date: "2023-04-25",
        slideshows: ["Thoughtscapes 2024", "Abstract Ideas 2023"],
        status: "used",
    }
];