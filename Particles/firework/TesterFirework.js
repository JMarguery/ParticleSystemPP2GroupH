class TesterFirework extends Tester{


    static steps_per_measure;
    static create(min_nb_particule,
                  max_nb_particule,
                  step_nb_particule,
                  min_fps,
                  func_change_nb_particule,
                  func_reset_sim,
                  measurement_amount,
                  steps_per_measure,
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
        this.steps_per_measure = steps_per_measure;
        this.data.push({
            nb_particule : this.nb_particule,
            measurement_ammount : this.measurement_amount,
            fps : new Array(this.measurement_amount).fill(0),
            medium_time_between_frames : new Array(this.measurement_amount).fill(0)
        });

    }

    static onestep(delta,frameAmount){
        const fps = frameAmount/(delta/1000);
        console.log(fps);
        this.data[this.step]['fps'][this.steps_per_measure] = fps;
        //this.data[this.step].medium_time_between_frames[this.measurement_step] = fps/1000;
        this.measurement_step+=1;
        this.moyenne_fps = fps;
        if(this.measurement_step == this.measurement_amount) {
            TesterFirework.next_step();
        }
    }


    static next_step(){

        console.log("okok");
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
            this.ttt(this.nb_particule);
            this.func_reset_sim();
        }
    }

    static ttt(arg){
        console.log("nombre de particule : "+arg);
        this.func_change_nb_particule(arg);
    }
}