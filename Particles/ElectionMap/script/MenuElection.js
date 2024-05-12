class MenuElection extends Menu{


    static menu;
    static content;
    static system;
    static canvasManager;
    static simulation;

    static create(system,canvasManager,simulation){
        super.create(system,canvasManager,simulation);

        document.getElementById("allVille").addEventListener('change', function() {
            if(this.checked){
                simulation.afficherVilles();
            }
        })

        document.getElementById("maxVote").addEventListener('change', function() {
            if(this.checked){
                simulation.resetData();
            }
        })

        document.getElementById("perCandidate").addEventListener('change', function() {
            if(this.checked){
                const year = document.getElementById("year_perCandidate").value;
                console.log(year)
                simulation.startPerCandidateAnimation(parseInt(year));
            }
        })

        document.getElementById("year_perCandidate").addEventListener('change', function() {
            const perCandidateChecked = document.getElementById("perCandidate").checked;
            if(perCandidateChecked){
                console.log(this.value)
                simulation.startPerCandidateAnimation(parseInt(this.value));
            }
        })
    }
}