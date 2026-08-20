# Clinical Trial

Project for the **Process and Service Design (PSD)** course at Politecnico di Milano (A.Y. 2024/2025).

An initiator hospital designs a trial protocol, which must get the internal ethical committee's approval. Once the trial protocol is approved, the initiator contacts collaborators and asks them if they want to participate in the trial, waiting 10 days for their answers. If at least N collaborators accept, the initiator notifies them to start experimenting and to send back their results within 3 months. Once the initiator has collected all results, it draws up a final report on the trial and sends it to all the collaborators who participated.

## Repository structure

- [`processes/`](processes) — BPMN source of the choreography and collaboration diagrams
- [`bpmn_executable/`](bpmn_executable) and [`nets/`](nets) — executable process (deployed on Camunda) and Petri net models
- [`services/`](services) — Node.js implementation of the internal and collaborator services, the async workers, and the Camunda correlation set

## Choreographed process

The initiator, after getting the internal ethical committee's approval, starts the process by sending an invite to collaborators to participate in the clinical trial. After 10 days, if at least N collaborators decided to participate, the initiator sends them a notification to start the experimentation. They have 90 days to send back their results; if the collaborators have not sent them within 80 days, the initiator sends them a reminder. Once the results are collected, the initiator analyzes all the received results, writes a final report of the clinical trial, and sends it to those who participated.

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

## Services

The `services/` folder contains the running implementation of the process, split by role:

- **`internal/`** — the initiator-side REST API (trial creation, results collection, report generation)
- **`collaborator/`** — the collaborator-side REST API (trial participation, reminders, report retrieval), one instance per collaborator
- **`worker/`** — background workers that evaluate collaborators' answers and results and drive the Camunda process forward via message correlation
- **`camunda/correlation-set_api.json`** — the async correlation sets (`answers`, `results`) used to match incoming messages to the right trial/collaborator instance in the executable process

### Internal API

| Method | Path | Description |
|---|---|---|
| GET | `/trials` | Get all trial resources |
| POST | `/trials` | Create a new trial resource, in the Initiator context |
| DELETE | `/trials/{trialId}` | Delete a trial resource, in the Initiator context |
| PUT | `/trials/{trialId}/results/{collaboratorId}` | Create or update a collaborator's results for a given trial |
| GET | `/trials/{trialId}/results` | Return all results for a specific trial |
| PUT | `/trials/{trialId}/report` | Create the final report for a specific trial, in the Initiator context |

### Collaborator API

| Method | Path | Description |
|---|---|---|
| GET | `/trials` | Get all trial resources, in the collaborator context |
| POST | `/trials` | Create a trial resource, initialized with status `WAITING_FOR_START` |
| PATCH | `/trials/{trialId}` | Update the status of a trial resource (started, ended, ...) |
| DELETE | `/trials/{trialId}` | Delete a trial resource, in the collaborator context |
| POST | `/trials/{trialId}/reminders` | Create a reminder sub-resource |
| PUT | `/trials/{trialId}/report` | Create or update the report sub-resource |

### Running it

`services/utils/runner.sh` installs dependencies and launches the whole stack: the three workers, the internal server, and N collaborator instances (one per port starting at 4001).

```bash
cd services/utils
./runner.sh --collaborators <N>
```
