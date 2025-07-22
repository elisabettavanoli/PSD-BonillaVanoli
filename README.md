# Clinical Trial
An initiator hospital designs a trial protocol, which must get the internal ethical committee's approval. Once the trial protocol is approved, the initiator contacts collaborators and ask them if they want to partecipate in the trial and waits 10 days for their answers. If at least N collaborators accept the collaboration, the initiator notifies them to start experimenting and send back the results within 3 months. Once the initiator has collected all results, it draws a final report on the trial and send the results to all the collaborators who participated.

## Members:
* Andres Bonilla 10698144
* Elisabetta Vanoli 10777232

## Choreographed process
The initiator, after getting the internal ethical committee's approval, starts the process by sending an invite to collaborators to partecipate in the clinical trial. After 10 days, if at least N collaborators decided to participate, the initiator send them a notification to start the experimentation. They have 90 days to send back their results; if the collaborators did not sent them in 80 days, the initiator sends them a reminder. Once the results are collected, the initiator analyzes all the received results and writes a final report of the clinical trial and sends it to those who participated.

![Choreography Diagram](images/choreography.png)


## Collaboration Diagram

![Collaboration Diagram](images/collaboration.png)


## Petri Net
### Clinical trial process
![Clinical trial process](images/nets/clinicalTrial_process.png)
### Collecting results subprocess
![Collecting results subprocess](images/nets/collectingResults_subprocess.png)
### Request for participation subprocess
![Request for participation subprocess](images/nets/requestForParticipation_subprocess.png)

## Executable process
![Executable process](images/clinical-trial-process.pnml.png)



