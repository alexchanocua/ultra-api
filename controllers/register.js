const handleRegister = (req, res) => {
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    
    return res.json({email, name, password})
}

module.exports = {
    handleRegister
}