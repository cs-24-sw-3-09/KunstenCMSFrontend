/*

Formats

user:
{
    "id": INTEGER,
    "email": STRING@STRING.STRING,
    "firstName": STRING,
    "lastName": STRING,
    "pauseNotificationStart": DATE,
    "pauseNotificationEnd": DATE,
    "notificationState": BOOLEAN,
    "mediaPlanner": BOOLEAN,
    "admin": BOOLEAN,
}

Visual media:
{
    "id": INTEGER,
    "name": STRING,





}

display_device:
{
    "id": INTEGER,
    "name": STRING,
    "description": STRING,
    "type": STRING,
    "location": STRING,
    "capacity": INTEGER,
    "price": INTEGER,
    "image": STRING,
    "available": BOOLEAN,
}

 */



export let testUser = {
    "id": 1,
    "email": "aj@kunsten.dk",
    "firstName": "Anne",
    "lastName": "Jensen",
    "pauseNotificationStart": "2024/11/20",
    "pauseNotificationEnd": "2024/11/30",
    "notificationState": false,
    "mediaPlanner": false,
    "admin": false
}

export let testDevices = [
    {
        "id": 17,
        "name": "Skærm Reception Højre",
        "location": "Reception",
        "model": "Samsung",
        "displayOrientation": "Horizontal",
        "resolution": null,
        "connectedState": true,
        "fallbackVisualMedia": {
            "id": 67,
            "name": "Default fallback",
            "location": "",
            "fileType": "jpg",
            "description": "Default billede, som man kan bruge hvis man ikke ved hvad default ellers skal være.",
            "lastDateModified": "30/10/2003",
            "tags": [
                {
                    "id": 8,
                    "text": "default"
                },
                {
                    "id": 9,
                    "text": "image"
                }
            ]
        }
    },
    {
        "id": 18,
        "name": "Skærm Reception Venstre",
        "location": "Reception",
        "model": "Samsung",
        "displayOrientation": "Horizontal",
        "resolution": null,
        "connectedState": true,
        "fallbackVisualMedia": {
            "id": 67,
            "name": "Default fallback",
            "location": "",
            "fileType": "jpg",
            "description": "Default billede, som man kan bruge hvis man ikke ved hvad default ellers skal være.",
            "lastDateModified": "30/10/2003",
            "tags": [
                {
                    "id": 8,
                    "text": "default"
                },
                {
                    "id": 9,
                    "text": "image"
                }
            ]
        }
    }
]

export let testUsers = [
    {
        "id": 1,
        "email": "aj@kunsten.dk",
        "firstName": "Anne",
        "lastName": "Jensen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": true
    },
    {
        "id": 2,
        "email": "la@kunsten.dk",
        "firstName": "Lars",
        "lastName": "Andersen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": true
    },
    {
        "id": 3,
        "email": "sc@kunsten.dk",
        "firstName": "Sofie",
        "lastName": "Christensen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": false
    },
    {
        "id": 4,
        "email": "eh@kunsten.dk",
        "firstName": "Emil",
        "lastName": "Hansen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": false
    },
    {
        "id": 5,
        "email": "kp@kunsten.dk",
        "firstName": "Kasper",
        "lastName": "Pedersen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": false
    },
    {
        "id": 6,
        "email": "cn@kunsten.dk",
        "firstName": "Camilla",
        "lastName": "Nielsen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 7,
        "email": "ml@kunsten.dk",
        "firstName": "Maja",
        "lastName": "Larsen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 8,
        "email": "am@kunsten.dk",
        "firstName": "Anders",
        "lastName": "Mortensen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 9,
        "email": "so@kunsten.dk",
        "firstName": "Sebastian",
        "lastName": "Olsen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": false
    },
    {
        "id": 10,
        "email": "it@kunsten.dk",
        "firstName": "Ida",
        "lastName": "Thomsen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": true
    },
    {
        "id": 11,
        "email": "fr@kunsten.dk",
        "firstName": "Frederik",
        "lastName": "Rasmussen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 12,
        "email": "mk@kunsten.dk",
        "firstName": "Maria",
        "lastName": "Krogh",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 13,
        "email": "ve@kunsten.dk",
        "firstName": "Victor",
        "lastName": "Eriksen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 14,
        "email": "eh@kunsten.dk",
        "firstName": "Emma",
        "lastName": "Høgh",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 15,
        "email": "js@kunsten.dk",
        "firstName": "Julie",
        "lastName": "Svendsen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 16,
        "email": "cb@kunsten.dk",
        "firstName": "Christian",
        "lastName": "Bach",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": false
    },
    {
        "id": 17,
        "email": "ns@kunsten.dk",
        "firstName": "Nanna",
        "lastName": "Sørensen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 18,
        "email": "rb@kunsten.dk",
        "firstName": "Rasmus",
        "lastName": "Brandt",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": true,
        "admin": false
    },
    {
        "id": 19,
        "email": "lk@kunsten.dk",
        "firstName": "Louise",
        "lastName": "Knudsen",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    },
    {
        "id": 20,
        "email": "ab@kunsten.dk",
        "firstName": "Alexander",
        "lastName": "Bruun",
        "pauseNotificationStart": null,
        "pauseNotificationEnd": null,
        "notificationState": false,
        "mediaPlanner": false,
        "admin": false
    }
]
