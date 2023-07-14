import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return hash
}

export const comparePassword = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch
}