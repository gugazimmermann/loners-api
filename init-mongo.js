db.createUser(
    {
        user: "lonersapp",
        pwd: "lonersapp#Komal2020^",
        roles: [
            {
                role: "readWrite",
                db: "lonersapp"
            }
        ]
    }
);