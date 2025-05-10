export const genTerrain = () => Math.floor(Math.random() * 4) % 4 + 1
export const generateCard = () => ({
    w: genTerrain(),
    n: genTerrain(),
    s: genTerrain(),
    e: genTerrain()
})

export function generateField(w = 40, h = 40, density = 0.3) {

    const generateEntry = () => {
        return Math.random() < density ? generateCard() : null
    }
    return new Array(w).fill(0).map(() => new Array(h).fill(0).map(generateEntry))
}