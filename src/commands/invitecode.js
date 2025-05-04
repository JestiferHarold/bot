async function getInviteCode(message) {
    let chat = await message.getChat()
    let code = await message.getInviteCode()
    
    return message.reply(`Invite code ${code}`)
}

export default getInviteCode