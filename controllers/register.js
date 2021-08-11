const handleRegister = (req, res, bcrypt, db) => {
    const {email, name, password} = req.body;
    // making sure all fields are input
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    
    // hashing password w/bcrypt
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0], 
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'));
    
}

module.exports = {
    handleRegister
}