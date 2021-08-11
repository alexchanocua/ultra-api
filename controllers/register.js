const handleRegister = (req, res, bcrypt) => {
    const {email, name, password} = req.body;
    // making sure all fields are input
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    
    // hasing password w/bcrypt
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    return res.json({email, name, hash})
}

module.exports = {
    handleRegister
}