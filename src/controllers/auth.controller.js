import supabase from "../database";

const auth = {}

auth.signIn = async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password
        })
    } catch (error) {
        console.log(error)
    }
}