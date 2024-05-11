class Tester {

    static data = [];
    static printdata = [];
    static min_nb_particule;
    static max_nb_particule;
    static step_nb_particule;
    static func_change_nb_particule;
    static func_reset_sim;
    static min_fps;
    static nb_particule;
    static animate_func;

    static measurement_amount;
    static measurement_step = 0;
    static step = 0;
    static moyenne_fps;
    static create(min_nb_particule,
                  max_nb_particule,
                  step_nb_particule,
                  min_fps,
                  func_change_nb_particule,
                  func_reset_sim,
                  measurement_amount,
                  animate_func){
        this.min_nb_particule = min_nb_particule;
        this.max_nb_particule = max_nb_particule;
        this.min_fps = min_fps
        this.func_change_nb_particule = func_change_nb_particule;
        this.func_reset_sim = func_reset_sim;
        this.step_nb_particule = step_nb_particule;
        this.measurement_amount = measurement_amount;
        this.nb_particule = this.min_nb_particule;
        this.animate_func = animate_func;
        this.data.push({
            nb_particule : this.nb_particule,
            measurement_ammount : this.measurement_amount,
            fps : new Array(this.measurement_amount).fill(0),
            medium_time_between_frames : new Array(this.measurement_amount).fill(0)
        });

    }

    static startTest(){
        this.animate_func(performance.now());
        //Tester.ttt(this.nb_particule);
        //this.func_reset_sim();
    }

    static onesec(fps){
        this.data[this.step]['fps'][this.measurement_step] = fps;
        this.data[this.step].medium_time_between_frames[this.measurement_step] = fps/1000;
        this.measurement_step+=1;
        this.moyenne_fps += fps;
        if (this.measurement_step == this.measurement_amount){
            this.next_step();
        }
    }

    static next_step(){

        /*
        if (window.performance && window.performance.memory) {
            console.log("Utilisation de la mémoire : ", (window.performance.memory.usedJSHeapSize/(1024*1024)).toFixed(0));
        } else {
            console.log("API de performance mémoire non disponible.");
        }
        */
        this.data.push({
            nb_particule : this.nb_particule,
            measurement_ammount : this.measurement_amount,
            fps : new Array(this.measurement_amount).fill(0),
            medium_time_between_frames : new Array(this.measurement_amount).fill(0)
        })

        this.printdata.push({
            nb_particule : this.nb_particule,
            measurement_ammount : this.measurement_amount,
            fps_moyen : this.moyenne_fps/this.measurement_amount,
        })

        this.nb_particule += this.step_nb_particule;
        this.step+=1;

        if (this.nb_particule > this.max_nb_particule ||this.moyenne_fps <= this.min_fps){
            this.stop_sim();
        }else{
            this.measurement_step = 0;
            this.moyenne_fps = 0;
            Tester.ttt(this.nb_particule);
            this.func_reset_sim();
        }
    }

    static ttt(arg){
        Tester.func_change_nb_particule(arg);
    }

    static stop_sim(){
        console.log("____________________________________")
        console.log(this.printdata);
    }

}