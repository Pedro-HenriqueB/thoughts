const Thought = require("../models/Thoughts");
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = class ThoughtController {
  static async showThoughts(req, res) {
    let search = "";
    if (req.query.search) {
      search = req.query.search;
    }

    let order = "DESC";
    if (req.query.order === "old") {
      order = "ASC";
    }

    const thoughtsData = await Thought.findAll({
      include: User,
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [["createdAt", order]],
    });

    const thoughts = thoughtsData.map((result) => result.dataValues);
    let thoughtsQty = thoughts.length;
    if (thoughtsQty === 0) {
      thoughtsQty = false;
    }
    res.render("thoughts/home", {
      session: req.session,
      thoughts,
      search,
      thoughtsQty,
    });
  }

  static async dashboard(req, res) {
    const userId = req.session.userId;
    const thoughts = await Thought.findAll({
      where: { userId: userId },
      include: User,
    });

    let emptyThoughts = false;
    if (thoughts.length === 0) {
      emptyThoughts = true;
    }

    res.render("thoughts/dashboard", {
      session: req.session,
      thoughts: thoughts,
      emptyThoughts,
    });
  }

  static createThought(req, res) {
    console.log(req.session.userId);
    res.render("thoughts/create", { session: req.session });
  }

  static async createThoughtSave(req, res) {
    const thought = {
      title: req.body.title,
      UserId: req.session.userId,
    };

    try {
      await Thought.create(thought);
      req.flash("message", "Thought successfully created!");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (error) {
      console.log("An error occurred: " + error);
    }
  }

  static async removeThought(req, res) {
    const id = req.body.id;
    const userId = req.session.userId;

    try {
      await Thought.destroy({ where: { id: id, userId: userId } });
      req.flash("message", "Thought removed!");
      console.log("removing");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (error) {
      console.log("An error occurred: " + error);
    }
  }

  static async editThought(req, res) {
    const id = req.params.id;
    const thought = await Thought.findOne({ where: { id: id }, raw: true });
    console.log(thought);
    res.render("thoughts/edit", { thought });
  }

  static async updateThought(req, res) {
    const id = req.body.id;
    const thought = {
      title: req.body.title,
    };
    try {
      await Thought.update(thought, { where: { id: id } });
      req.flash("message", "Pensamento atualizado com sucesso!");
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (error) {
      console.log("An error occurred: " + error);
    }
  }
};
