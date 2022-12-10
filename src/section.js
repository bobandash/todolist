
//let's not use the section functionality for now,
//I can't think about how to deal with the exception where sections contain tasks, but projects can also not contain sections, but contain tasks
const section = (name, index, tasks = []) => {
    return {name, index, tasks};
}