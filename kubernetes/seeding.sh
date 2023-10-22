mongosh "mongodb://127.0.0.1:27017/dragonball" --username $USERNAME -p $PASSWORD --authenticationDatabase dragonball <<'EOF'
db.users.insertOne({
    username : 'admin',
    password : '$2b$10$al8KvO3PCchoB/nmwU6XZ.HjpmGRSw48SS8U8P0IjRuQlfkJKISUK',
    name : 'Admin',
    profile : 2.0
})
db.characters.insertOne({
    name: 'Goku',
    description: 'Goku is the main protagonist of the dragon ball series',
    avatar:
        'https://vignette.wikia.nocookie.net/dragonball/images/5/5b/Gokusteppingoutofaspaceship.jpg/revision/latest/scale-to-width-down/224?cb=20150325220848'
})
EOF

