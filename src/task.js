import indexCounter from './helper.js';

const task = (
    name,
    description,
    dueDate,
    [estTimeDays, estTimeHours, estTimeMinutes] = '',
    priority,
    subtasks = [],
    index) =>
{

    let currSubtaskIndex = indexCounter();
    
    function getName(){
        return name;
    }

    function getDescription(){
        return description;
    }

    function getDueDate(){
        return dueDate;
    }

    function getEstimatedTimeDays(){
        return estTimeDays;
    }

    function getEstimatedTimeHours(){
        return estTimeHours;
    }

    function getEstimatedTimeMinutes(){
        return estTimeMinutes;
    }

    function getEstimatedTime(){
        return {days, hours, minutes};
    }

    function getEstimatedTimeText(){
        let estTimeText = '';
        if(estTimeDays || estTimeHours || estTimeMinutes){
            if(estTimeDays){
                estTimeText = `${estTimeDays} Days`;
            }
            if(estTimeHours){
                if(estTimeText.includes('Days')){
                    estTimeText = `${estTimeText}, ${estTimeHours} Hours`;
                }
                else{
                    estTimeText = `${estTimeHours} Hours`
                }
            }
            if(estTimeMinutes){
                if(estTimeText.includes('Days') || estTimeText.includes('Hours')){
                    estTimeText = `${estTimeText}, ${estTimeMinutes} Minutes`;
                }
                else{
                    estTimeText = `${estTimeMinutes} Minutes`
                }                           
            }
        }
        return estTimeText;
    }

    //returns abbreviated text for the edit form's estimated time values
    function getAbbreviatedEstimatedTimeText(){
        let timeText = getEstimatedTimeText();

        if(timeText){
            timeText = timeText.replaceAll(' ','');
            timeText = timeText.replaceAll(',',':');
            timeText = timeText.replaceAll('Days','D');
            timeText = timeText.replaceAll('Hours','H');
            timeText = timeText.replaceAll('Minutes','M');
        }

        return timeText;
    }

    function getIndex(){
        return index;
    }

    function getPriority(){
        return priority;
    }

    function setName(newName){
        name = newName;
    }

    function setDescription(newDescription){
        description = newDescription;
    }

    function setPriority(newPriority){
        priority = newPriority;
    }

    function setDueDate(newDueDate){
        dueDate = newDueDate;
    }

    function setEstimatedTime([newDays, newHours, newMinutes]){
        estTimeDays = newDays;
        estTimeHours = newHours;
        estTimeMinutes = newMinutes;
    }

    function setIndex(taskIndex){
        index = taskIndex;
    }

    function getSubtasks(){
        return subtasks;
    }

    //need to set a unique index for subtask after it's created
    function addSubtask(subtaskObj){
        subtaskObj.setIndex(currSubtaskIndex.getIndex());
        subtasks.push(subtaskObj);
        currSubtaskIndex.incrementIndex();
    }

    function removeSubtask(index){
        subtasks.splice(index, 1);
    }

    function editSubtask(subtaskObj){
        subtasks.forEach((subtask, i) => {
            if(subtask.index === index){
                subtasks[i] = subtaskObj;
                return;
            }
        })
    }

    return {getName, getDescription, getDueDate, getEstimatedTimeDays, getEstimatedTimeHours, getEstimatedTimeMinutes, getAbbreviatedEstimatedTimeText, getEstimatedTimeText, getIndex, getPriority, getSubtasks,
            setName, setPriority, setDescription, setDueDate, setEstimatedTime, setIndex, addSubtask, removeSubtask};
}



export default task;